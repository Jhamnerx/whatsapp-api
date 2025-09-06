"use strict";
const _0x9fcda3 = _0x1c33;
(function (_0x27f7df, _0x53ed91) {
  const _0x50a45a = _0x1c33,
    _0x2de8ec = _0x27f7df();
  while (!![]) {
    try {
      const _0x430b18 =
        -parseInt(_0x50a45a(0xc1)) / 0x1 +
        (-parseInt(_0x50a45a(0xba)) / 0x2) * (parseInt(_0x50a45a(0xcc)) / 0x3) +
        -parseInt(_0x50a45a(0xf4)) / 0x4 +
        (-parseInt(_0x50a45a(0xbe)) / 0x5) * (parseInt(_0x50a45a(0xf2)) / 0x6) +
        parseInt(_0x50a45a(0xd7)) / 0x7 +
        parseInt(_0x50a45a(0xeb)) / 0x8 +
        parseInt(_0x50a45a(0xa5)) / 0x9;
      if (_0x430b18 === _0x53ed91) break;
      else _0x2de8ec["push"](_0x2de8ec["shift"]());
    } catch (_0x5e2105) {
      _0x2de8ec["push"](_0x2de8ec["shift"]());
    }
  }
})(_0x5122, 0xcb017);
const _ = require(_0x9fcda3(0xfe)),
  { Boom } = require(_0x9fcda3(0xda)),
  { default: makeWASocket } = require(_0x9fcda3(0xa4)),
  {
    fetchLatestBaileysVersion,
    useMultiFileAuthState,
    makeCacheableSignalKeyStore,
  } = require(_0x9fcda3(0xa4)),
  { DisconnectReason } = require(_0x9fcda3(0xa4)),
  QRCode = require(_0x9fcda3(0xc0)),
  fs = require("fs");
let sock = [],
  qrcode = [],
  intervalStore = [];
const { setStatus } = require(_0x9fcda3(0xd8)),
  { IncomingMessage } = require("./controllers/incomingMessage"),
  { formatReceipt } = require(_0x9fcda3(0x100)),
  axios = require("axios"),
  MAIN_LOGGER = require(_0x9fcda3(0xf1)),
  logger = MAIN_LOGGER["child"]({}),
  connectToWhatsApp = async (_0x24d6cc, _0x4ef862 = null) => {
    const _0x346b87 = _0x9fcda3;
    if (typeof qrcode[_0x24d6cc] !== "undefined")
      return (
        _0x4ef862 !== null &&
          _0x4ef862[_0x346b87(0xc5)](_0x346b87(0xc0), {
            token: _0x24d6cc,
            data: qrcode[_0x24d6cc],
            message: _0x346b87(0xdf),
          }),
        {
          status: ![],
          sock: sock[_0x24d6cc],
          qrcode: qrcode[_0x24d6cc],
          message: _0x346b87(0xdd),
        }
      );
    try {
      let _0x50afed =
        sock[_0x24d6cc][_0x346b87(0xb6)]["id"][_0x346b87(0xab)](":");
      _0x50afed = _0x50afed[0x0] + _0x346b87(0xc6);
      const _0x5bb73b = await getPpUrl(_0x24d6cc, _0x50afed);
      return (
        _0x4ef862 !== null &&
          (_0x4ef862[_0x346b87(0xc5)]("connection-open", {
            token: _0x24d6cc,
            user: sock[_0x24d6cc][_0x346b87(0xb6)],
            ppUrl: _0x5bb73b,
          }),
          console[_0x346b87(0xcb)](sock[_0x24d6cc][_0x346b87(0xb6)])),
        { status: !![], message: _0x346b87(0xff) }
      );
    } catch (_0x49a35d) {
      _0x4ef862 !== null &&
        _0x4ef862["emit"](_0x346b87(0xe1), {
          token: _0x24d6cc,
          message: _0x346b87(0xe2),
        });
    }
    const { version: _0x5d7fb8, isLatest: _0x11438f } =
      await fetchLatestBaileysVersion();
    console[_0x346b87(0xcb)](
      "You\x20re\x20using\x20whatsapp\x20gateway\x20WABOT\x20v5.0.0\x20-\x20Contact\x20admin\x20if\x20any\x20trouble\x20:\x20082298859671"
    ),
      console[_0x346b87(0xcb)](
        "using\x20WA\x20v" +
          _0x5d7fb8["join"](".") +
          _0x346b87(0x10c) +
          _0x11438f
      );
    const { state: _0x34f66c, saveCreds: _0xb41efa } =
      await useMultiFileAuthState(_0x346b87(0x103) + _0x24d6cc);
    return (
      (sock[_0x24d6cc] = makeWASocket({
        version: _0x5d7fb8,
        browser: [_0x346b87(0xe3), _0x346b87(0xfb), _0x346b87(0xb7)],
        logger: logger,
        printQRInTerminal: !![],
        patchMessageBeforeSending: (_0x4990db) => {
          const _0x1b0f39 = _0x346b87,
            _0x58a25b = Boolean(
              _0x4990db?.[_0x1b0f39(0xef)] ||
                _0x4990db?.[_0x1b0f39(0xec)] ||
                _0x4990db?.[_0x1b0f39(0xca)]
            );
          return (
            _0x4990db?.[_0x1b0f39(0xec)] &&
              ((_0x4990db[_0x1b0f39(0xec)]["hydratedFourRowTemplate"] = _[
                _0x1b0f39(0xb8)
              ](_0x4990db[_0x1b0f39(0xec)][_0x1b0f39(0x106)])),
              delete _0x4990db[_0x1b0f39(0xec)][_0x1b0f39(0xa6)]),
            _0x4990db?.[_0x1b0f39(0xbf)]?.[_0x1b0f39(0xe1)]?.[
              _0x1b0f39(0xec)
            ] &&
              ((_0x4990db[_0x1b0f39(0xbf)][_0x1b0f39(0xe1)][_0x1b0f39(0xec)][
                _0x1b0f39(0xcf)
              ] = _[_0x1b0f39(0xb8)](
                _0x4990db[_0x1b0f39(0xbf)]["message"][_0x1b0f39(0xec)][
                  _0x1b0f39(0x106)
                ]
              )),
              delete _0x4990db[_0x1b0f39(0xbf)][_0x1b0f39(0xe1)][
                _0x1b0f39(0xec)
              ][_0x1b0f39(0xa6)]),
            _0x58a25b &&
              (_0x4990db = {
                viewOnceMessage: {
                  message: {
                    messageContextInfo: {
                      deviceListMetadataVersion: 0x2,
                      deviceListMetadata: {},
                    },
                    ..._0x4990db,
                  },
                },
              }),
            _0x4990db
          );
        },
        auth: {
          creds: _0x34f66c[_0x346b87(0xfa)],
          keys: makeCacheableSignalKeyStore(_0x34f66c["keys"], logger),
        },
      })),
      sock[_0x24d6cc]["ev"][_0x346b87(0x105)](async (_0x3e428c) => {
        const _0x172d49 = _0x346b87;
        if (_0x3e428c[_0x172d49(0xd6)]) {
          const _0x5b596a = _0x3e428c["connection.update"],
            {
              connection: _0x4a5033,
              lastDisconnect: _0x1be921,
              qr: _0x15c77a,
            } = _0x5b596a;
          if (_0x4a5033 === _0x172d49(0xf3)) {
            console[_0x172d49(0xcb)]("close");
            if (
              (_0x1be921?.[_0x172d49(0x104)] instanceof Boom)?.[
                _0x172d49(0xc3)
              ]?.[_0x172d49(0xf6)] !== DisconnectReason["loggedOut"]
            ) {
              delete qrcode[_0x24d6cc];
              if (_0x4ef862 != null)
                _0x4ef862[_0x172d49(0xc5)](_0x172d49(0xe1), {
                  token: _0x24d6cc,
                  message: _0x172d49(0xf9),
                });
              if (
                _0x1be921[_0x172d49(0x104)]?.["output"]?.[_0x172d49(0xb0)]?.[
                  _0x172d49(0xe1)
                ] === _0x172d49(0xaa)
              ) {
                delete qrcode[_0x24d6cc], sock[_0x24d6cc]["ws"]["close"]();
                if (_0x4ef862 != null)
                  _0x4ef862[_0x172d49(0xc5)](_0x172d49(0xe1), {
                    token: _0x24d6cc,
                    message: _0x172d49(0xd5),
                  });
                return;
              }
              _0x1be921?.[_0x172d49(0x104)]["output"][_0x172d49(0xb0)][
                _0x172d49(0xe1)
              ] != _0x172d49(0x108) && connectToWhatsApp(_0x24d6cc, _0x4ef862);
            } else
              setStatus(_0x24d6cc, _0x172d49(0xdc)),
                console[_0x172d49(0xcb)](_0x172d49(0xee)),
                _0x4ef862 !== null &&
                  _0x4ef862[_0x172d49(0xc5)](_0x172d49(0xe1), {
                    token: _0x24d6cc,
                    message: _0x172d49(0xee),
                  }),
                clearConnection(_0x24d6cc);
          }
          _0x15c77a &&
            QRCode[_0x172d49(0xbc)](_0x15c77a, function (_0x1dfb32, _0x9735b7) {
              const _0x1169cb = _0x172d49;
              _0x1dfb32 && console[_0x1169cb(0xcb)](_0x1dfb32),
                (qrcode[_0x24d6cc] = _0x9735b7),
                _0x4ef862 !== null &&
                  _0x4ef862[_0x1169cb(0xc5)](_0x1169cb(0xc0), {
                    token: _0x24d6cc,
                    data: _0x9735b7,
                    message: _0x1169cb(0xc4),
                  });
            });
          if (_0x4a5033 === _0x172d49(0xc2)) {
            setStatus(_0x24d6cc, _0x172d49(0xce));
            let _0x1c45b4 =
              sock[_0x24d6cc][_0x172d49(0xb6)]["id"][_0x172d49(0xab)](":");
            _0x1c45b4 = _0x1c45b4[0x0] + _0x172d49(0xc6);
            const _0x387257 = await getPpUrl(_0x24d6cc, _0x1c45b4);
            _0x4ef862 !== null &&
              _0x4ef862["emit"]("connection-open", {
                token: _0x24d6cc,
                user: sock[_0x24d6cc]["user"],
                ppUrl: _0x387257,
              }),
              delete qrcode[_0x24d6cc];
          }
        }
        if (_0x3e428c[_0x172d49(0xc9)]) {
          const _0x30f27b = _0x3e428c[_0x172d49(0xc9)];
          IncomingMessage(_0x30f27b, sock[_0x24d6cc]);
        }
        if (_0x3e428c["creds.update"]) {
          const _0x1635d4 = _0x3e428c[_0x172d49(0xe0)];
          _0xb41efa(_0x1635d4);
        }
      }),
      { sock: sock[_0x24d6cc], qrcode: qrcode[_0x24d6cc] }
    );
  };
async function connectWaBeforeSend(_0x46e6d8) {
  const _0x65ef2c = _0x9fcda3;
  let _0x111b17 = undefined,
    _0x4be919;
  (_0x4be919 = await connectToWhatsApp(_0x46e6d8)),
    await _0x4be919[_0x65ef2c(0xd2)]["ev"]["on"](
      _0x65ef2c(0xd6),
      (_0x5bf8fb) => {
        const _0x1aa100 = _0x65ef2c,
          { connection: _0x4d608e, qr: _0xcd9d88 } = _0x5bf8fb;
        _0x4d608e === _0x1aa100(0xc2) && (_0x111b17 = !![]),
          _0xcd9d88 && (_0x111b17 = ![]);
      }
    );
  let _0x411b64 = 0x0;
  while (typeof _0x111b17 === _0x65ef2c(0xd1)) {
    _0x411b64++;
    if (_0x411b64 > 0x4) break;
    await new Promise((_0x137fcb) => setTimeout(_0x137fcb, 0x3e8));
  }
  return _0x111b17;
}
const sendText = async (_0x3a2009, _0x2e638d, _0x44069b) => {
    const _0x2f2a6b = _0x9fcda3;
    try {
      const _0x108988 = await sock[_0x3a2009][_0x2f2a6b(0xf0)](
        formatReceipt(_0x2e638d),
        { text: _0x44069b }
      );
      return console[_0x2f2a6b(0xcb)](_0x108988), _0x108988;
    } catch (_0x42106e) {
      return console[_0x2f2a6b(0xcb)](_0x42106e), ![];
    }
  },
  sendMessage = async (_0x22b52d, _0x56766f, _0x26181e) => {
    const _0x180ad6 = _0x9fcda3;
    try {
      const _0x395912 = await sock[_0x22b52d][_0x180ad6(0xf0)](
        formatReceipt(_0x56766f),
        JSON["parse"](_0x26181e)
      );
      return _0x395912;
    } catch (_0x5bf7f5) {
      return console[_0x180ad6(0xcb)](_0x5bf7f5), ![];
    }
  };
async function sendMedia(
  _0x5216a7,
  _0x1bcf66,
  _0x493dfa,
  _0x53b82,
  _0x396510,
  _0x38e33f,
  _0x3d4e17
) {
  const _0x384750 = _0x9fcda3,
    _0x38682c = formatReceipt(_0x1bcf66);
  try {
    if (_0x493dfa == _0x384750(0xbb))
      var _0x185bb1 = await sock[_0x5216a7][_0x384750(0xf0)](_0x38682c, {
        image: _0x53b82
          ? { url: _0x53b82 }
          : fs[_0x384750(0xa8)](_0x384750(0xe8) + fileName),
        caption: _0x396510 ? _0x396510 : null,
      });
    else {
      if (_0x493dfa == _0x384750(0xed))
        var _0x185bb1 = await sock[_0x5216a7][_0x384750(0xf0)](_0x38682c, {
          video: _0x53b82
            ? { url: _0x53b82 }
            : fs[_0x384750(0xa8)]("src/public/temp/" + _0x3d4e17),
          caption: _0x396510 ? _0x396510 : null,
        });
      else {
        if (_0x493dfa == _0x384750(0x107))
          var _0x185bb1 = await sock[_0x5216a7][_0x384750(0xf0)](_0x38682c, {
            audio: _0x53b82
              ? { url: _0x53b82 }
              : fs[_0x384750(0xa8)]("src/public/temp/" + _0x3d4e17),
            ptt: _0x38e33f == 0x0 ? ![] : !![],
            mimetype: "audio/mpeg",
          });
        else {
          if (_0x493dfa == _0x384750(0xd3))
            var _0x185bb1 = await sock[_0x5216a7]["sendMessage"](
              _0x38682c,
              {
                document: { url: _0x53b82 },
                mimetype: _0x384750(0xe7),
                fileName: _0x3d4e17 + ".pdf",
              },
              { url: _0x53b82 }
            );
          else {
            if (_0x493dfa == "xls")
              var _0x185bb1 = await sock[_0x5216a7][_0x384750(0xf0)](
                _0x38682c,
                {
                  document: { url: _0x53b82 },
                  mimetype: "application/excel",
                  fileName: _0x3d4e17 + ".xls",
                },
                { url: _0x53b82 }
              );
            else {
              if (_0x493dfa == _0x384750(0xe5))
                var _0x185bb1 = await sock[_0x5216a7][_0x384750(0xf0)](
                  _0x38682c,
                  {
                    document: { url: _0x53b82 },
                    mimetype: _0x384750(0xd0),
                    fileName: _0x3d4e17 + ".xlsx",
                  },
                  { url: _0x53b82 }
                );
              else {
                if (_0x493dfa == _0x384750(0xae))
                  var _0x185bb1 = await sock[_0x5216a7][_0x384750(0xf0)](
                    _0x38682c,
                    {
                      document: { url: _0x53b82 },
                      mimetype: _0x384750(0xc7),
                      fileName: _0x3d4e17 + _0x384750(0x10b),
                    },
                    { url: _0x53b82 }
                  );
                else {
                  if (_0x493dfa == _0x384750(0xe4))
                    var _0x185bb1 = await sock[_0x5216a7][_0x384750(0xf0)](
                      _0x38682c,
                      {
                        document: { url: _0x53b82 },
                        mimetype: _0x384750(0xe9),
                        fileName: _0x3d4e17 + _0x384750(0xd9),
                      },
                      { url: _0x53b82 }
                    );
                  else {
                    if (_0x493dfa == _0x384750(0x102))
                      var _0x185bb1 = await sock[_0x5216a7][_0x384750(0xf0)](
                        _0x38682c,
                        {
                          document: { url: _0x53b82 },
                          mimetype: _0x384750(0x101),
                          fileName: _0x3d4e17 + _0x384750(0xa2),
                        },
                        { url: _0x53b82 }
                      );
                    else {
                      if (_0x493dfa == _0x384750(0xfc))
                        var _0x185bb1 = await sock[_0x5216a7][_0x384750(0xf0)](
                          _0x38682c,
                          {
                            document: { url: _0x53b82 },
                            mimetype: "application/mp3",
                          },
                          { url: _0x53b82 }
                        );
                      else
                        return (
                          console[_0x384750(0xcb)](
                            "Please\x20add\x20your\x20won\x20role\x20of\x20mimetype"
                          ),
                          { error: !![], message: _0x384750(0xb4) }
                        );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return _0x185bb1;
  } catch (_0xed3767) {
    return ![];
  }
}
function _0x1c33(_0x136baf, _0x1ac9e5) {
  const _0x5122a3 = _0x5122();
  return (
    (_0x1c33 = function (_0x1c3374, _0x283952) {
      _0x1c3374 = _0x1c3374 - 0xa2;
      let _0x3ad5ed = _0x5122a3[_0x1c3374];
      return _0x3ad5ed;
    }),
    _0x1c33(_0x136baf, _0x1ac9e5)
  );
}
async function sendButtonMessage(
  _0x4ffc8c,
  _0x2aa099,
  _0x3bf63b,
  _0x2a8533,
  _0x22b6ae,
  _0x315043
) {
  const _0x451793 = _0x9fcda3;
  let _0x56ccee = _0x451793(0xea);
  try {
    const _0x5c7e8f = _0x3bf63b[_0x451793(0xb9)]((_0x47317d, _0x18916c) => {
      return {
        buttonId: _0x18916c,
        buttonText: { displayText: _0x47317d["displayText"] },
        type: 0x1,
      };
    });
    if (_0x315043)
      var _0x58663f = {
        image:
          _0x56ccee == "url"
            ? { url: _0x315043 }
            : fs["readFileSync"](_0x451793(0xe8) + _0x315043),
        caption: _0x2a8533,
        footer: _0x22b6ae,
        buttons: _0x5c7e8f,
        headerType: 0x4,
        viewOnce: !![],
      };
    else
      var _0x58663f = {
        text: _0x2a8533,
        footer: _0x22b6ae,
        buttons: _0x5c7e8f,
        headerType: 0x1,
        viewOnce: !![],
      };
    const _0x25e083 = await sock[_0x4ffc8c][_0x451793(0xf0)](
      formatReceipt(_0x2aa099),
      _0x58663f
    );
    return _0x25e083;
  } catch (_0x352e40) {
    return console[_0x451793(0xcb)](_0x352e40), ![];
  }
}
async function sendTemplateMessage(
  _0x2dd7ef,
  _0x154164,
  _0x510251,
  _0x372b68,
  _0x5e586a,
  _0x57e09b
) {
  const _0x15d463 = _0x9fcda3;
  try {
    if (_0x57e09b)
      var _0x4d6485 = {
        caption: _0x372b68,
        footer: _0x5e586a,
        viewOnce: !![],
        templateButtons: _0x510251,
        image: { url: _0x57e09b },
        viewOnce: !![],
      };
    else
      var _0x4d6485 = {
        text: _0x372b68,
        footer: _0x5e586a,
        viewOnce: !![],
        templateButtons: _0x510251,
      };
    const _0x5623c3 = await sock[_0x2dd7ef][_0x15d463(0xf0)](
      formatReceipt(_0x154164),
      _0x4d6485
    );
    return _0x5623c3;
  } catch (_0x10f405) {
    return console[_0x15d463(0xcb)](_0x10f405), ![];
  }
}
async function sendListMessage(
  _0x409055,
  _0x2f469d,
  _0x54a037,
  _0x38bde4,
  _0xf79207,
  _0x12e6d0,
  _0x3f4b03
) {
  const _0x6bfe3f = _0x9fcda3;
  try {
    const _0x53ffe9 = {
        text: _0x38bde4,
        footer: _0xf79207,
        title: _0x12e6d0,
        buttonText: _0x3f4b03,
        sections: [_0x54a037],
        viewOnce: !![],
      },
      _0x17ddb8 = await sock[_0x409055][_0x6bfe3f(0xf0)](
        formatReceipt(_0x2f469d),
        _0x53ffe9,
        { ephemeralExpiration: 0x93a80 }
      );
    return _0x17ddb8;
  } catch (_0x10b0d7) {
    return console[_0x6bfe3f(0xcb)](_0x10b0d7), ![];
  }
}
async function fetchGroups(_0x494d1e) {
  const _0x5792f5 = _0x9fcda3;
  try {
    let _0x5d7e30 = await sock[_0x494d1e]["groupFetchAllParticipating"](),
      _0x5895f5 = Object[_0x5792f5(0xf7)](_0x5d7e30)
        [_0x5792f5(0xb2)](0x0)
        ["map"]((_0x3f1334) => _0x3f1334[0x1]);
    return _0x5895f5;
  } catch (_0x17ad10) {
    return ![];
  }
}
function _0x5122() {
  const _0x17cdf8 = [
    "statusCode",
    "entries",
    "onWhatsApp",
    "Connecting..",
    "creds",
    "Chrome",
    "mp3",
    "Connection\x20restored",
    "lodash",
    "Already\x20connected",
    "./lib/helper",
    "application/zip",
    "zip",
    "./credentials/",
    "error",
    "process",
    "hydratedTemplate",
    "audio",
    "Stream\x20Errored\x20(conflict)",
    "Nothing\x20deleted",
    "\x20is\x20deleted",
    ".doc",
    ",\x20isLatest:\x20",
    ".zip",
    "rmSync",
    "@whiskeysockets/baileys",
    "17766711OPouRC",
    "fourRowTemplate",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png",
    "readFileSync",
    "get",
    "QR\x20refs\x20attempts\x20ended",
    "split",
    "Logout\x20Progres..",
    "credentials/",
    "doc",
    "send",
    "payload",
    "exports",
    "slice",
    "status",
    "Please\x20add\x20your\x20won\x20role\x20of\x20mimetype",
    "body",
    "user",
    "103.0.5060.114",
    "cloneDeep",
    "map",
    "4fEMzrs",
    "image",
    "toDataURL",
    "logout",
    "34415qxyVoX",
    "deviceSentMessage",
    "qrcode",
    "1601447fKqlIY",
    "open",
    "output",
    "Please\x20scan\x20with\x20your\x20Whatsapp\x20Account",
    "emit",
    "@s.whatsapp.net",
    "application/msword",
    "existsSync",
    "messages.upsert",
    "listMessage",
    "log",
    "800706wbMTar",
    "Unauthorized",
    "Connected",
    "hydratedFourRowTemplate",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "undefined",
    "sock",
    "pdf",
    "includes",
    "Request\x20QR\x20ended.\x20reload\x20scan\x20to\x20request\x20QR\x20again",
    "connection.update",
    "8001245hWfXZs",
    "./database/index",
    ".docx",
    "@hapi/boom",
    "json",
    "Disconnect",
    "Please\x20scann\x20qrcode",
    "https://versionhistory.googleapis.com/v1/chrome/platforms/linux/channels/stable/versions",
    "please\x20scan\x20with\x20your\x20Whatsapp\x20Account",
    "creds.update",
    "message",
    "Connecting..\x20(1)",
    "WABOT",
    "docx",
    "xlsx",
    "Connection\x20failed",
    "application/pdf",
    "src/public/temp/",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "url",
    "8609520bTELtC",
    "templateMessage",
    "video",
    "Connection\x20closed.\x20You\x20are\x20logged\x20out.",
    "buttonsMessage",
    "sendMessage",
    "./lib/pino",
    "534SEaCyb",
    "close",
    "2455820dxUCaH",
    "@g.us",
  ];
  _0x5122 = function () {
    return _0x17cdf8;
  };
  return _0x5122();
}
async function isExist(_0x20e563, _0x462e77) {
  const _0x44034b = _0x9fcda3;
  if (typeof sock[_0x20e563] === _0x44034b(0xd1)) {
    const _0x583ff2 = await connectWaBeforeSend(_0x20e563);
    if (!_0x583ff2) return ![];
  }
  try {
    if (_0x462e77[_0x44034b(0xd4)](_0x44034b(0xf5))) return !![];
    else {
      const [_0x4d543d] = await sock[_0x20e563][_0x44034b(0xf8)](_0x462e77);
      return _0x4d543d;
    }
  } catch (_0x5f3c75) {
    return ![];
  }
}
async function getPpUrl(_0x59d062, _0xc99294, _0x17e819) {
  const _0x3d5cf3 = _0x9fcda3;
  let _0x58801d;
  try {
    return (
      (_0x58801d = await sock[_0x59d062]["profilePictureUrl"](_0xc99294)),
      _0x58801d
    );
  } catch (_0x846e01) {
    return _0x3d5cf3(0xa7);
  }
}
async function deleteCredentials(_0x5bed0a, _0xed7a7d = null) {
  const _0x142f06 = _0x9fcda3;
  _0xed7a7d !== null &&
    _0xed7a7d[_0x142f06(0xc5)]("message", {
      token: _0x5bed0a,
      message: _0x142f06(0xac),
    });
  try {
    if (typeof sock[_0x5bed0a] === _0x142f06(0xd1)) {
      const _0x57d746 = await connectWaBeforeSend(_0x5bed0a);
      _0x57d746 && (sock[_0x5bed0a][_0x142f06(0xbd)](), delete sock[_0x5bed0a]);
    } else sock[_0x5bed0a][_0x142f06(0xbd)](), delete sock[_0x5bed0a];
    return (
      delete qrcode[_0x5bed0a],
      clearInterval(intervalStore[_0x5bed0a]),
      setStatus(_0x5bed0a, _0x142f06(0xdc)),
      _0xed7a7d != null &&
        (_0xed7a7d[_0x142f06(0xc5)](_0x142f06(0xcd), _0x5bed0a),
        _0xed7a7d[_0x142f06(0xc5)]("message", {
          token: _0x5bed0a,
          message: "Connection\x20closed.\x20You\x20are\x20logged\x20out.",
        })),
      fs["existsSync"]("./credentials/" + _0x5bed0a) &&
        fs["rmSync"](
          _0x142f06(0x103) + _0x5bed0a,
          { recursive: !![], force: !![] },
          (_0x4c5243) => {
            const _0x290df9 = _0x142f06;
            if (_0x4c5243) console[_0x290df9(0xcb)](_0x4c5243);
          }
        ),
      { status: !![], message: "Deleting\x20session\x20and\x20credential" }
    );
  } catch (_0xa93434) {
    return (
      console[_0x142f06(0xcb)](_0xa93434),
      { status: !![], message: _0x142f06(0x109) }
    );
  }
}
async function getChromeLates() {
  const _0x4f0a14 = _0x9fcda3,
    _0x2cd973 = await axios[_0x4f0a14(0xa9)](_0x4f0a14(0xde));
  return _0x2cd973;
}
function clearConnection(_0x2ecdaf) {
  const _0x241c3e = _0x9fcda3;
  clearInterval(intervalStore[_0x2ecdaf]),
    delete sock[_0x2ecdaf],
    delete qrcode[_0x2ecdaf],
    setStatus(_0x2ecdaf, _0x241c3e(0xdc)),
    fs[_0x241c3e(0xc8)](_0x241c3e(0x103) + _0x2ecdaf) &&
      (fs[_0x241c3e(0xa3)](
        "./credentials/" + _0x2ecdaf,
        { recursive: !![], force: !![] },
        (_0x1ef97a) => {
          const _0xc49c80 = _0x241c3e;
          if (_0x1ef97a) console[_0xc49c80(0xcb)](_0x1ef97a);
        }
      ),
      console[_0x241c3e(0xcb)](_0x241c3e(0xad) + _0x2ecdaf + _0x241c3e(0x10a)));
}
async function initialize(_0x40dfa9, _0x7b8045) {
  const _0x2a5772 = _0x9fcda3,
    { token: _0x3a0b89 } = _0x40dfa9[_0x2a5772(0xb5)];
  if (_0x3a0b89) {
    const _0x20e238 = require("fs"),
      _0x1a1e1a = _0x2a5772(0x103) + _0x3a0b89;
    if (_0x20e238[_0x2a5772(0xc8)](_0x1a1e1a)) {
      sock[_0x3a0b89] = undefined;
      const _0x200a38 = await connectWaBeforeSend(_0x3a0b89);
      return _0x200a38
        ? _0x7b8045[_0x2a5772(0xb3)](0xc8)["json"]({
            status: !![],
            message: _0x2a5772(0xfd),
          })
        : _0x7b8045["status"](0xc8)[_0x2a5772(0xdb)]({
            status: ![],
            message: _0x2a5772(0xe6),
          });
    }
    return _0x7b8045[_0x2a5772(0xaf)]({
      status: ![],
      message: _0x3a0b89 + "\x20Connection\x20failed,please\x20scan\x20first",
    });
  }
  return _0x7b8045["send"]({ status: ![], message: "Wrong\x20Parameterss" });
}
module[_0x9fcda3(0xb1)] = {
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
