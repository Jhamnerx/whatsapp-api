/**
 * Controlador Principal de API WhatsApp
 * Desofuscado completamente para mejor mantenimiento y legibilidad
 */

"use strict";

// Importar módulo de WhatsApp
const wa = require("../whatsapp");

/**
 * Crear nueva instancia de WhatsApp
 * @param {Object} req - Request con token en body
 * @param {Object} res - Response object
 */
const createInstance = async (req, res) => {
  const { token } = req.body;

  if (token) {
    try {
      const result = await wa.connectToWhatsApp(token, req.io);
      const status = result?.status;
      const message = result?.message;

      return res.send({
        status: status ?? "processing",
        qrcode: result?.qrcode,
        message: message ? message : "Processing",
      });
    } catch (error) {
      console.log(error);
      return res.send({ status: false, error: error });
    }
  }

  res.status(403).end("Token needed");
};

/**
 * Enviar mensaje de texto
 * @param {Object} req - Request con token, number y text en body
 * @param {Object} res - Response object
 */
const sendText = async (req, res) => {
  const { token, number, text } = req.body;

  if (token && number && text) {
    const result = await wa.sendText(token, number, text);
    return handleResponseSendMessage(result, res);
  }

  res.send({ status: false, message: "Check your parameter" });
};

/**
 * Enviar archivos multimedia (imagen, video, audio, documento)
 * @param {Object} req - Request con parámetros multimedia
 * @param {Object} res - Response object
 */
const sendMedia = async (req, res) => {
  const { token, number, type, url, caption, ptt, filename } = req.body;

  if (token && number && type && url) {
    const result = await wa.sendMedia(
      token,
      number,
      type,
      url,
      caption ?? "",
      ptt,
      filename
    );
    return handleResponseSendMessage(result, res);
  }

  res.send({ status: false, message: "Check your parameter" });
};

/**
 * Enviar mensaje con botones
 * @param {Object} req - Request con token, number, button, message, footer, image
 * @param {Object} res - Response object
 */
const sendButtonMessage = async (req, res) => {
  const { token, number, button, message, footer, image } = req.body;

  const buttonData = JSON.parse(button);

  if (token && number && button && message) {
    const result = await wa.sendButtonMessage(
      token,
      number,
      buttonData,
      message,
      footer,
      image
    );
    return handleResponseSendMessage(result, res);
  }

  res.send({ status: false, message: "Check your parameterr" });
};

/**
 * Enviar mensaje con template (botones con imagen)
 * @param {Object} req - Request con parámetros de template
 * @param {Object} res - Response object
 */
const sendTemplateMessage = async (req, res) => {
  const { token, number, button, text, footer, image } = req.body;

  if (token && number && button && text && footer) {
    const result = await wa.sendTemplateMessage(
      token,
      number,
      JSON.parse(button),
      text,
      footer,
      image
    );
    return handleResponseSendMessage(result, res);
  }

  res.send({ status: false, message: "Check your parameter" });
};

/**
 * Enviar mensaje con lista desplegable
 * @param {Object} req - Request con parámetros de lista
 * @param {Object} res - Response object
 */
const sendListMessage = async (req, res) => {
  const { token, number, list, text, footer, title, buttonText } = req.body;

  if (token && number && list && text && title && buttonText) {
    const result = await wa.sendListMessage(
      token,
      number,
      JSON.parse(list),
      text,
      footer ?? "",
      title,
      buttonText
    );
    return handleResponseSendMessage(result, res);
  }

  res.send({ status: false, message: "Check your parameterr" });
};

/**
 * Obtener lista de grupos
 * @param {Object} req - Request con token
 * @param {Object} res - Response object
 */
const fetchGroups = async (req, res) => {
  const { token } = req.body;

  if (token) {
    const result = await wa.fetchGroups(token);
    return handleResponseSendMessage(result, res);
  }

  res.send({ status: false, message: "Check your parameter" });
};

/**
 * Eliminar credenciales de WhatsApp
 * @param {Object} req - Request con token
 * @param {Object} res - Response object
 */
const deleteCredentials = async (req, res) => {
  const { token } = req.body;

  if (token) {
    const result = await wa.deleteCredentials(token);
    return handleResponseSendMessage(result, res);
  }

  res.send({
    status: false,
    message: "Check your parameter",
  });
};

/**
 * Manejar respuesta estándar para envío de mensajes
 * @param {Object} result - Resultado de la operación
 * @param {Object} res - Response object
 * @param {*} defaultValue - Valor por defecto (no usado)
 */
const handleResponseSendMessage = (result, res, defaultValue = null) => {
  if (result) {
    return res.send({ status: true, data: result });
  }
  return res.send({ status: false, message: "Check your whatsapp connection" });
};

// Exportar todas las funciones
module.exports = {
  createInstance: createInstance,
  sendText: sendText,
  sendMedia: sendMedia,
  sendButtonMessage: sendButtonMessage,
  sendTemplateMessage: sendTemplateMessage,
  sendListMessage: sendListMessage,
  deleteCredentials: deleteCredentials,
  fetchGroups: fetchGroups,
};

/**
 * Código original ofuscado (para referencia):
 *
 * El código original usaba:
 * - Función _0x2222 para mapeo de strings
 * - Array _0x2596 con strings codificados
 * - IIFE anti-debugging con cálculos matemáticos complejos
 * - Variables ofuscadas como _0x1ca8d9, _0x552ea6, etc.
 *
 * Funcionalidades desofuscadas:
 * 1. createInstance: Conectar nueva instancia de WhatsApp
 * 2. sendText: Enviar mensajes de texto simples
 * 3. sendMedia: Enviar archivos multimedia (imagen, video, audio, docs)
 * 4. sendButtonMessage: Mensajes con botones interactivos
 * 5. sendTemplateMessage: Mensajes con template y botones
 * 6. sendListMessage: Mensajes con listas desplegables
 * 7. fetchGroups: Obtener lista de grupos del usuario
 * 8. deleteCredentials: Eliminar credenciales almacenadas
 * 9. handleResponseSendMessage: Manejar respuestas estándar
 */
