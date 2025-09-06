const { dbQuery } = require("../database/index");
const { parseIncomingMessage } = require("../lib/helper");

require("dotenv").config();

const axios = require("axios");
const {
  isExistsEqualCommand,
  isExistsContainCommand,
  getUrlWebhook,
} = require("../lib/helper");

// Función para asegurar codificación UTF-8 correcta
const ensureUtf8 = (str) => {
  if (typeof str !== "string") return str;
  try {
    // Convertir a Buffer y de vuelta a string para normalizar UTF-8
    return Buffer.from(str, "utf8").toString("utf8");
  } catch (error) {
    console.log("Error encoding string:", error);
    return str;
  }
};

// Función para extraer número de teléfono limpio
const cleanPhoneNumber = (jid) => {
  if (typeof jid !== "string") return jid;
  try {
    // Remover sufijos de WhatsApp como @s.whatsapp.net, @c.us, etc.
    let cleanNumber = jid.replace(/@.*$/g, "");

    // Si contiene ":", tomar solo la parte antes de ":"
    if (cleanNumber.includes(":")) {
      cleanNumber = cleanNumber.split(":")[0];
    }

    // Asegurar que solo contenga números
    cleanNumber = cleanNumber.replace(/\D/g, "");

    return cleanNumber;
  } catch (error) {
    console.log("Error cleaning phone number:", error);
    return jid;
  }
};

const IncomingMessage = async (messages, whatsappClient) => {
  try {
    let isQuoted = false;

    // Verificar si hay mensajes
    if (!messages.messages) return;

    // Tomar el primer mensaje
    const message = messages.messages[0];

    // Obtener el nombre del remitente
    const pushName = message?.pushName || "";

    // Filtrar mensajes propios y de estado
    if (message.key.fromMe === true) return;
    if (message.key.remoteJid === "status@broadcast") return;

    // Parsear el mensaje entrante
    const {
      command: messageText,
      bufferImage: imageBuffer,
      from: fromNumber,
    } = await parseIncomingMessage(message);

    // Extraer número de teléfono del remoteJid como respaldo
    const remoteJid = message.key.remoteJid;
    const cleanFromNumber =
      cleanPhoneNumber(fromNumber) || cleanPhoneNumber(remoteJid);

    // Debug logs
    console.log("Original from:", fromNumber);
    console.log("RemoteJid:", remoteJid);
    console.log("Cleaned from:", cleanFromNumber);

    let responseMessage, autoreplies;

    // Obtener el número del dispositivo (extraer antes de ":")
    const deviceNumber = whatsappClient.user.id.split(":")[0];

    // Buscar comandos exactos
    const exactCommands = await isExistsEqualCommand(messageText, deviceNumber);

    // Si hay comandos exactos, usarlos; sino buscar comandos que contengan el texto
    if (exactCommands.length > 0) {
      autoreplies = exactCommands;
    } else {
      autoreplies = await isExistsContainCommand(messageText, deviceNumber);
    }

    // Si no hay autoreplies, enviar webhook
    if (autoreplies.length === 0) {
      const webhookUrl = await getUrlWebhook(deviceNumber);
      if (webhookUrl == null) return;

      const webhookResponse = await sendWebhook({
        command: messageText,
        bufferImage: imageBuffer,
        from: cleanFromNumber,
        to: deviceNumber,
        url: webhookUrl,
      });

      if (webhookResponse === false) return;
      if (webhookResponse === undefined) return;
      if (typeof webhookResponse != "object") return;

      isQuoted = webhookResponse?.is_quoted ? true : false;
      responseMessage = JSON.stringify(webhookResponse);
    } else {
      // Verificar condiciones de respuesta (All, Group, Personal)
      const shouldReply =
        autoreplies[0].reply_when == "All"
          ? true
          : autoreplies[0].reply_when == "Group" &&
            message.key.remoteJid.includes("@g.us")
          ? true
          : autoreplies[0].reply_when == "Personal" &&
            !message.key.remoteJid.includes("@g.us")
          ? true
          : false;

      if (shouldReply === false) return;

      isQuoted = autoreplies[0].is_quoted ? true : false;

      // Verificar tipo de servidor
      if (process.env.TYPE_SERVER === "hosting") {
        responseMessage = autoreplies[0].reply;
      } else {
        responseMessage = JSON.stringify(autoreplies[0].reply);
      }
    }

    // Reemplazar placeholder {name} con el nombre del remitente
    responseMessage = responseMessage.replace(/{name}/g, pushName);

    // Enviar respuesta
    await whatsappClient
      .sendMessage(message.key.remoteJid, JSON.parse(responseMessage), {
        quoted: isQuoted ? message : null,
      })
      .catch((error) => {
        console.log(error);
      });

    return true;
  } catch (error) {
    console.log(error);
  }
};

async function sendWebhook({
  command: messageText,
  bufferImage: imageBuffer,
  from: fromNumber,
  to: toNumber,
  url: webhookUrl,
}) {
  try {
    const payload = {
      message: ensureUtf8(messageText),
      bufferImage: imageBuffer == undefined ? null : imageBuffer,
      from: ensureUtf8(fromNumber),
      to: ensureUtf8(toNumber),
    };

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      "Accept-Charset": "utf-8",
    };

    const response = await axios
      .post(webhookUrl, payload, {
        headers: headers,
        timeout: 5000,
        responseType: "json",
        responseEncoding: "utf8",
      })
      .catch(() => {
        return false;
      });

    return response.data;
  } catch (error) {
    console.log("error send webhook", error);
    return false;
  }
}

module.exports = { IncomingMessage };
