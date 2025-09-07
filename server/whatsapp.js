"use strict";

const _ = require("lodash");
const { Boom } = require("@hapi/boom");
const { default: makeWASocket } = require("@whiskeysockets/baileys");
const {
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
} = require("@whiskeysockets/baileys");
const { DisconnectReason } = require("@whiskeysockets/baileys");
const QRCode = require("qrcode");
const fs = require("fs");
let sock = [];
let qrcode = [];
let intervalStore = [];
const { setStatus } = require("./database/index");
const { IncomingMessage } = require("./controllers/incomingMessage");
const { formatReceipt } = require("./lib/helper");
const axios = require("axios");
const MAIN_LOGGER = require("./lib/pino");
const logger = MAIN_LOGGER.child({});
const connectToWhatsApp = async (token, io = null) => {
  if (typeof qrcode[token] !== "undefined") {
    if (io !== null) {
      io.emit("qrcode", {
        token: token,
        data: qrcode[token],
        message: "please scan with your Whatsapp Account",
      });
    }
    return {
      status: false,
      sock: sock[token],
      qrcode: qrcode[token],
      message: "Please scann qrcode",
    };
  }
  try {
    let userJid = sock[token].user.id.split(":");
    userJid = userJid[0] + "@s.whatsapp.net";
    const ppUrl = await getPpUrl(token, userJid);
    if (io !== null) {
      io.emit("connection-open", {
        token: token,
        user: sock[token].user,
        ppUrl: ppUrl,
      });
      console.log(sock[token].user);
    }
    return {
      status: true,
      message: "Already connected",
    };
  } catch (error) {
    if (io !== null) {
      io.emit("message", {
        token: token,
        message: "Connecting.. (1)",
      });
    }
  }
  const { version: version, isLatest: isLatest } =
    await fetchLatestBaileysVersion();
  console.log(
    "You re using whatsapp gateway WABOT v5.0.0 - Contact admin if any trouble : 082298859671"
  );
  console.log("using WA v" + version.join(".") + ", isLatest: " + isLatest);
  const { state: state, saveCreds: saveCreds } = await useMultiFileAuthState(
    "./credentials/" + token
  );
  sock[token] = makeWASocket({
    version: version,
    browser: ["WABOT", "Chrome", "103.0.5060.114"],
    logger: logger,
    patchMessageBeforeSending: (message) => {
      const requiresBusinessCompat = Boolean(
        message?.["buttonsMessage"] ||
          message?.["templateMessage"] ||
          message?.["listMessage"]
      );
      if (message?.["templateMessage"]) {
        message.templateMessage.hydratedFourRowTemplate = _.cloneDeep(
          message.templateMessage.hydratedTemplate
        );
        delete message.templateMessage.fourRowTemplate;
      }
      if (message?.["deviceSentMessage"]?.["message"]?.["templateMessage"]) {
        message.deviceSentMessage.message.templateMessage.hydratedFourRowTemplate =
          _.cloneDeep(
            message.deviceSentMessage.message.templateMessage.hydratedTemplate
          );
        delete message.deviceSentMessage.message.templateMessage
          .fourRowTemplate;
      }
      if (requiresBusinessCompat) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {},
              },
              ...message,
            },
          },
        };
      }
      return message;
    },
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
  });
  sock[token].ev.process(async (events) => {
    if (events["connection.update"]) {
      const update = events["connection.update"];
      const {
        connection: connection,
        lastDisconnect: lastDisconnect,
        qr: qr,
      } = update;
      if (connection === "close") {
        console.log("close");
        if (
          (lastDisconnect?.["error"] instanceof Boom)?.["output"]?.[
            "statusCode"
          ] !== DisconnectReason.loggedOut
        ) {
          delete qrcode[token];
          if (io != null) {
            io.emit("message", {
              token: token,
              message: "Connecting..",
            });
          }
          if (
            lastDisconnect.error?.["output"]?.["payload"]?.["message"] ===
            "QR refs attempts ended"
          ) {
            delete qrcode[token];
            sock[token].ws.close();
            if (io != null) {
              io.emit("message", {
                token: token,
                message: "Request QR ended. reload scan to request QR again",
              });
            }
            return;
          }
          if (
            lastDisconnect?.["error"]["output"]["payload"]["message"] !=
            "Stream Errored (conflict)"
          ) {
            connectToWhatsApp(token, io);
          }
        } else {
          setStatus(token, "Disconnect");
          console.log("Connection closed. You are logged out.");
          if (io !== null) {
            io.emit("message", {
              token: token,
              message: "Connection closed. You are logged out.",
            });
          }
          clearConnection(token);
        }
      }
      if (qr) {
        QRCode.toDataURL(qr, function (err, url) {
          if (err) {
            console.log(err);
          }
          qrcode[token] = url;
          if (io !== null) {
            io.emit("qrcode", {
              token: token,
              data: url,
              message: "Please scan with your Whatsapp Account",
            });
          }
        });
      }
      if (connection === "open") {
        setStatus(token, "Connected");
        let userJid = sock[token].user.id.split(":");
        userJid = userJid[0] + "@s.whatsapp.net";
        const ppUrl = await getPpUrl(token, userJid);
        if (io !== null) {
          io.emit("connection-open", {
            token: token,
            user: sock[token].user,
            ppUrl: ppUrl,
          });
        }
        delete qrcode[token];
      }
    }
    if (events["messages.upsert"]) {
      const messageUpsert = events["messages.upsert"];
      IncomingMessage(messageUpsert, sock[token]);
    }
    if (events["creds.update"]) {
      const creds = events["creds.update"];
      saveCreds(creds);
    }
  });
  return {
    sock: sock[token],
    qrcode: qrcode[token],
  };
};
async function connectWaBeforeSend(token) {
  let isConnected = undefined;
  let result;
  result = await connectToWhatsApp(token);
  await result.sock.ev.on("connection.update", (update) => {
    const { connection: connection, qr: qr } = update;
    if (connection === "open") {
      isConnected = true;
    }
    if (qr) {
      isConnected = false;
    }
  });
  let attempts = 0;
  while (typeof isConnected === "undefined") {
    attempts++;
    if (attempts > 4) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return isConnected;
}
const sendText = async (token, to, text) => {
  try {
    const result = await sock[token].sendMessage(formatReceipt(to), {
      text: text,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const sendMessage = async (token, to, message) => {
  try {
    const result = await sock[token].sendMessage(
      formatReceipt(to),
      JSON.parse(message)
    );
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
async function sendMedia(token, to, type, url, caption, ptt, fileName) {
  const jid = formatReceipt(to);
  try {
    if (type == "image") {
      var result = await sock[token].sendMessage(jid, {
        image: url
          ? {
              url: url,
            }
          : fs.readFileSync("src/public/temp/" + fileName),
        caption: caption ? caption : null,
      });
    } else {
      if (type == "video") {
        var result = await sock[token].sendMessage(jid, {
          video: url
            ? {
                url: url,
              }
            : fs.readFileSync("src/public/temp/" + fileName),
          caption: caption ? caption : null,
        });
      } else {
        if (type == "audio") {
          var result = await sock[token].sendMessage(jid, {
            audio: url
              ? {
                  url: url,
                }
              : fs.readFileSync("src/public/temp/" + fileName),
            ptt: !(ptt == 0),
            mimetype: "audio/mpeg",
          });
        } else {
          if (type == "pdf") {
            var result = await sock[token].sendMessage(
              jid,
              {
                document: {
                  url: url,
                },
                mimetype: "application/pdf",
                fileName: fileName + ".pdf",
              },
              {
                url: url,
              }
            );
          } else {
            if (type == "xls") {
              var result = await sock[token].sendMessage(
                jid,
                {
                  document: {
                    url: url,
                  },
                  mimetype: "application/excel",
                  fileName: fileName + ".xls",
                },
                {
                  url: url,
                }
              );
            } else {
              if (type == "xlsx") {
                var result = await sock[token].sendMessage(
                  jid,
                  {
                    document: {
                      url: url,
                    },
                    mimetype:
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    fileName: fileName + ".xlsx",
                  },
                  {
                    url: url,
                  }
                );
              } else {
                if (type == "doc") {
                  var result = await sock[token].sendMessage(
                    jid,
                    {
                      document: {
                        url: url,
                      },
                      mimetype: "application/msword",
                      fileName: fileName + ".doc",
                    },
                    {
                      url: url,
                    }
                  );
                } else {
                  if (type == "docx") {
                    var result = await sock[token].sendMessage(
                      jid,
                      {
                        document: {
                          url: url,
                        },
                        mimetype:
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        fileName: fileName + ".docx",
                      },
                      {
                        url: url,
                      }
                    );
                  } else {
                    if (type == "zip") {
                      var result = await sock[token].sendMessage(
                        jid,
                        {
                          document: {
                            url: url,
                          },
                          mimetype: "application/zip",
                          fileName: fileName + ".zip",
                        },
                        {
                          url: url,
                        }
                      );
                    } else {
                      if (type == "mp3") {
                        var result = await sock[token].sendMessage(
                          jid,
                          {
                            document: {
                              url: url,
                            },
                            mimetype: "application/mp3",
                          },
                          {
                            url: url,
                          }
                        );
                      } else {
                        console.log("Please add your won role of mimetype");
                        return {
                          error: true,
                          message: "Please add your won role of mimetype",
                        };
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return result;
  } catch (error) {
    return false;
  }
}
async function sendButtonMessage(token, to, buttons, text, footer, imageUrl) {
  try {
    const buttonElements = buttons.map((button, index) => {
      return {
        buttonId: index,
        buttonText: {
          displayText: button.displayText,
        },
        type: 1,
      };
    });
    if (imageUrl) {
      var messageOptions = {
        image: {
          url: imageUrl,
        },
        caption: text,
        footer: footer,
        buttons: buttonElements,
        headerType: 4,
        viewOnce: true,
      };
    } else {
      var messageOptions = {
        text: text,
        footer: footer,
        buttons: buttonElements,
        headerType: 1,
        viewOnce: true,
      };
    }
    const result = await sock[token].sendMessage(
      formatReceipt(to),
      messageOptions
    );
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function sendTemplateMessage(
  token,
  to,
  templateButtons,
  text,
  footer,
  imageUrl
) {
  try {
    if (imageUrl) {
      var messageOptions = {
        caption: text,
        footer: footer,
        viewOnce: true,
        templateButtons: templateButtons,
        image: {
          url: imageUrl,
        },
        viewOnce: true,
      };
    } else {
      var messageOptions = {
        text: text,
        footer: footer,
        viewOnce: true,
        templateButtons: templateButtons,
      };
    }
    const result = await sock[token].sendMessage(
      formatReceipt(to),
      messageOptions
    );
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function sendListMessage(
  token,
  to,
  sections,
  text,
  footer,
  title,
  buttonText
) {
  console.log("sendListMessage parameters:", {
    token,
    to,
    sections: JSON.stringify(sections, null, 2),
    text,
    footer,
    title,
    buttonText,
  });

  try {
    // Verificar si sections tiene la estructura correcta
    const validSections = Array.isArray(sections) ? sections : [sections];

    // Estructura básica para listas en Baileys
    const listMessage = {
      text: text,
      footer: footer,
      title: title,
      buttonText: buttonText,
      sections: validSections,
    };

    console.log(
      "Final listMessage structure:",
      JSON.stringify(listMessage, null, 2)
    );

    // Enviar directamente como listMessage
    const result = await sock[token].sendMessage(formatReceipt(to), {
      listMessage: listMessage,
    });
    return result;
  } catch (error) {
    console.log("Error in sendListMessage:", error);

    // Fallback: enviar solo el texto si la lista falla
    try {
      console.log("Attempting fallback to text message...");
      const textResult = await sock[token].sendMessage(formatReceipt(to), {
        text: text,
      });
      return textResult;
    } catch (fallbackError) {
      console.log("Fallback also failed:", fallbackError);
      return false;
    }
  }
}
async function fetchGroups(token) {
  try {
    let groups = await sock[token].groupFetchAllParticipating();
    let groupsArray = Object.entries(groups)
      .slice(0)
      .map((entry) => entry[1]);
    return groupsArray;
  } catch (error) {
    return false;
  }
}
async function isExist(token, to) {
  if (typeof sock[token] === "undefined") {
    const isConnected = await connectWaBeforeSend(token);
    if (!isConnected) {
      return false;
    }
  }
  try {
    if (to.includes("@g.us")) {
      return true;
    } else {
      const [exists] = await sock[token].onWhatsApp(to);
      return exists;
    }
  } catch (error) {
    return false;
  }
}
async function getPpUrl(token, jid, isPreview) {
  let ppUrl;
  try {
    ppUrl = await sock[token].profilePictureUrl(jid);
    return ppUrl;
  } catch (error) {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png";
  }
}
async function deleteCredentials(token, io = null) {
  if (io !== null) {
    io.emit("message", {
      token: token,
      message: "Logout Progres..",
    });
  }
  try {
    if (typeof sock[token] === "undefined") {
      const isConnected = await connectWaBeforeSend(token);
      if (isConnected) {
        sock[token].logout();
        delete sock[token];
      }
    } else {
      sock[token].logout();
      delete sock[token];
    }
    delete qrcode[token];
    clearInterval(intervalStore[token]);
    setStatus(token, "Disconnect");
    if (io != null) {
      io.emit("Unauthorized", token);
      io.emit("message", {
        token: token,
        message: "Connection closed. You are logged out.",
      });
    }
    if (fs.existsSync("./credentials/" + token)) {
      fs.rmSync(
        "./credentials/" + token,
        {
          recursive: true,
          force: true,
        },
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );
    }
    return {
      status: true,
      message: "Deleting session and credential",
    };
  } catch (error) {
    console.log(error);
    return {
      status: true,
      message: "Nothing deleted",
    };
  }
}
async function getChromeLates() {
  const response = await axios.get(
    "https://versionhistory.googleapis.com/v1/chrome/platforms/linux/channels/stable/versions"
  );
  return response;
}
function clearConnection(token) {
  clearInterval(intervalStore[token]);
  delete sock[token];
  delete qrcode[token];
  setStatus(token, "Disconnect");
  if (fs.existsSync("./credentials/" + token)) {
    fs.rmSync(
      "./credentials/" + token,
      {
        recursive: true,
        force: true,
      },
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );
    console.log("credentials/" + token + " is deleted");
  }
}
async function initialize(req, res) {
  const { token: token } = req.body;
  if (token) {
    const fs = require("fs");
    const credentialsPath = "./credentials/" + token;
    if (fs.existsSync(credentialsPath)) {
      sock[token] = undefined;
      const isConnected = await connectWaBeforeSend(token);
      return isConnected
        ? res.status(200).json({
            status: true,
            message: "Connection restored",
          })
        : res.status(200).json({
            status: false,
            message: "Connection failed",
          });
    }
    return res.send({
      status: false,
      message: token + " Connection failed,please scan first",
    });
  }
  return res.send({
    status: false,
    message: "Wrong Parameterss",
  });
}
module.exports = {
  connectToWhatsApp: connectToWhatsApp,
  sendText: sendText,
  sendMedia: sendMedia,
  sendButtonMessage: sendButtonMessage,
  sendTemplateMessage: sendTemplateMessage,
  sendListMessage: sendListMessage,
  isExist: isExist,
  getPpUrl: getPpUrl,
  fetchGroups: fetchGroups,
  deleteCredentials: deleteCredentials,
  sendMessage: sendMessage,
  initialize: initialize,
  connectWaBeforeSend: connectWaBeforeSend,
};
