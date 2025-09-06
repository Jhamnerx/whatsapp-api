"use strict";
const _0x1ca8d9 = _0x2222;
function _0x2222(_0x5dddd9, _0x5d9eeb) {
  const _0x25962b = _0x2596();
  return (
    (_0x2222 = function (_0x222246, _0x4808c0) {
      _0x222246 = _0x222246 - 0x152;
      let _0x377295 = _0x25962b[_0x222246];
      return _0x377295;
    }),
    _0x2222(_0x5dddd9, _0x5d9eeb)
  );
}
(function (_0x10ce4a, _0x3adc87) {
  const _0x580781 = _0x2222,
    _0x4680a3 = _0x10ce4a();
  while (!![]) {
    try {
      const _0x39879e =
        -parseInt(_0x580781(0x154)) / 0x1 +
        (-parseInt(_0x580781(0x164)) / 0x2) *
          (parseInt(_0x580781(0x169)) / 0x3) +
        parseInt(_0x580781(0x162)) / 0x4 +
        (parseInt(_0x580781(0x157)) / 0x5) *
          (parseInt(_0x580781(0x168)) / 0x6) +
        (parseInt(_0x580781(0x152)) / 0x7) *
          (-parseInt(_0x580781(0x16b)) / 0x8) +
        -parseInt(_0x580781(0x15c)) / 0x9 +
        (parseInt(_0x580781(0x15b)) / 0xa) * (parseInt(_0x580781(0x163)) / 0xb);
      if (_0x39879e === _0x3adc87) break;
      else _0x4680a3["push"](_0x4680a3["shift"]());
    } catch (_0x437933) {
      _0x4680a3["push"](_0x4680a3["shift"]());
    }
  }
})(_0x2596, 0xe9a6d);
const wa = require(_0x1ca8d9(0x160)),
  createInstance = async (_0x18a7a7, _0x4a8609) => {
    const _0x552ea6 = _0x1ca8d9,
      { token: _0x2eb7ff } = _0x18a7a7["body"];
    if (_0x2eb7ff)
      try {
        const _0x32d89b = await wa[_0x552ea6(0x15a)](
            _0x2eb7ff,
            _0x18a7a7["io"]
          ),
          _0x278762 = _0x32d89b?.["status"],
          _0x270781 = _0x32d89b?.["message"];
        return _0x4a8609[_0x552ea6(0x159)]({
          status: _0x278762 ?? "processing",
          qrcode: _0x32d89b?.["qrcode"],
          message: _0x270781 ? _0x270781 : _0x552ea6(0x15e),
        });
      } catch (_0x564943) {
        return (
          console[_0x552ea6(0x15f)](_0x564943),
          _0x4a8609[_0x552ea6(0x159)]({ status: ![], error: _0x564943 })
        );
      }
    _0x4a8609[_0x552ea6(0x16c)](0x193)[_0x552ea6(0x153)](_0x552ea6(0x165));
  },
  sendText = async (_0x1338ca, _0x291199) => {
    const _0x5c96fd = _0x1ca8d9,
      {
        token: _0x3fc612,
        number: _0x3a732a,
        text: _0xbeb059,
      } = _0x1338ca[_0x5c96fd(0x166)];
    if (_0x3fc612 && _0x3a732a && _0xbeb059) {
      const _0x167f9d = await wa[_0x5c96fd(0x15d)](
        _0x3fc612,
        _0x3a732a,
        _0xbeb059
      );
      return handleResponSendMessage(_0x167f9d, _0x291199);
    }
    _0x291199[_0x5c96fd(0x159)]({ status: ![], message: _0x5c96fd(0x16e) });
  },
  sendMedia = async (_0x3e1894, _0x640679) => {
    const _0x442490 = _0x1ca8d9,
      {
        token: _0x489034,
        number: _0x55e2e7,
        type: _0x44bbbf,
        url: _0x2c4513,
        caption: _0x45e2f3,
        ptt: _0x4d39e9,
        filename: _0x46c9a3,
      } = _0x3e1894[_0x442490(0x166)];
    if (_0x489034 && _0x55e2e7 && _0x44bbbf && _0x2c4513) {
      const _0x7884a3 = await wa[_0x442490(0x158)](
        _0x489034,
        _0x55e2e7,
        _0x44bbbf,
        _0x2c4513,
        _0x45e2f3 ?? "",
        _0x4d39e9,
        _0x46c9a3
      );
      return handleResponSendMessage(_0x7884a3, _0x640679);
    }
    _0x640679[_0x442490(0x159)]({ status: ![], message: _0x442490(0x16e) });
  },
  sendButtonMessage = async (_0x580721, _0x49c6ba) => {
    const _0x14fd7a = _0x1ca8d9,
      {
        token: _0x5aa902,
        number: _0x1655a9,
        button: _0x55dc29,
        message: _0x287ff3,
        footer: _0x177930,
        image: _0x1f01b8,
      } = _0x580721["body"],
      _0x32d4dd = JSON[_0x14fd7a(0x16d)](_0x55dc29);
    if (_0x5aa902 && _0x1655a9 && _0x55dc29 && _0x287ff3) {
      const _0x4d8db0 = await wa[_0x14fd7a(0x167)](
        _0x5aa902,
        _0x1655a9,
        _0x32d4dd,
        _0x287ff3,
        _0x177930,
        _0x1f01b8
      );
      return handleResponSendMessage(_0x4d8db0, _0x49c6ba);
    }
    _0x49c6ba[_0x14fd7a(0x159)]({ status: ![], message: _0x14fd7a(0x161) });
  },
  sendTemplateMessage = async (_0x321add, _0x38eaa8) => {
    const _0xd691da = _0x1ca8d9,
      {
        token: _0x21a1f5,
        number: _0x1b78eb,
        button: _0x174cd0,
        text: _0x46d8cd,
        footer: _0x3b85f6,
        image: _0x1ea5ff,
      } = _0x321add[_0xd691da(0x166)];
    if (_0x21a1f5 && _0x1b78eb && _0x174cd0 && _0x46d8cd && _0x3b85f6) {
      const _0x5ee430 = await wa["sendTemplateMessage"](
        _0x21a1f5,
        _0x1b78eb,
        JSON["parse"](_0x174cd0),
        _0x46d8cd,
        _0x3b85f6,
        _0x1ea5ff
      );
      return handleResponSendMessage(_0x5ee430, _0x38eaa8);
    }
    _0x38eaa8[_0xd691da(0x159)]({ status: ![], message: _0xd691da(0x16e) });
  },
  sendListMessage = async (_0x1a2da1, _0x1ade26) => {
    const _0x3bbe4a = _0x1ca8d9,
      {
        token: _0x5091f7,
        number: _0x447407,
        list: _0x61bafe,
        text: _0x3d1918,
        footer: _0xdd906,
        title: _0x3a5c43,
        buttonText: _0x4bbbeb,
      } = _0x1a2da1[_0x3bbe4a(0x166)];
    if (
      _0x5091f7 &&
      _0x447407 &&
      _0x61bafe &&
      _0x3d1918 &&
      _0x3a5c43 &&
      _0x4bbbeb
    ) {
      const _0x16160b = await wa[_0x3bbe4a(0x16a)](
        _0x5091f7,
        _0x447407,
        JSON[_0x3bbe4a(0x16d)](_0x61bafe),
        _0x3d1918,
        _0xdd906 ?? "",
        _0x3a5c43,
        _0x4bbbeb
      );
      return handleResponSendMessage(_0x16160b, _0x1ade26);
    }
    _0x1ade26[_0x3bbe4a(0x159)]({ status: ![], message: _0x3bbe4a(0x161) });
  },
  fetchGroups = async (_0x40b389, _0x4d0af4) => {
    const _0xee46a4 = _0x1ca8d9,
      { token: _0x99d762 } = _0x40b389["body"];
    if (_0x99d762) {
      const _0x52ee4f = await wa["fetchGroups"](_0x99d762);
      return handleResponSendMessage(_0x52ee4f, _0x4d0af4);
    }
    _0x4d0af4[_0xee46a4(0x159)]({ status: ![], message: _0xee46a4(0x16e) });
  },
  deleteCredentials = async (_0x5c1332, _0x937eca) => {
    const _0x43c2e0 = _0x1ca8d9,
      { token: _0xa944c6 } = _0x5c1332[_0x43c2e0(0x166)];
    if (_0xa944c6) {
      const _0x589ca6 = await wa[_0x43c2e0(0x156)](_0xa944c6);
      return handleResponSendMessage(_0x589ca6, _0x937eca);
    }
    _0x937eca[_0x43c2e0(0x159)]({
      status: ![],
      message: "Check\x20your\x20parameter",
    });
  },
  handleResponSendMessage = (_0x48f4dd, _0x1e47a1, _0x374359 = null) => {
    const _0x34868f = _0x1ca8d9;
    if (_0x48f4dd)
      return _0x1e47a1[_0x34868f(0x159)]({ status: !![], data: _0x48f4dd });
    return _0x1e47a1["send"]({ status: ![], message: _0x34868f(0x155) });
  };
module["exports"] = {
  createInstance: createInstance,
  sendText: sendText,
  sendMedia: sendMedia,
  sendButtonMessage: sendButtonMessage,
  sendTemplateMessage: sendTemplateMessage,
  sendListMessage: sendListMessage,
  deleteCredentials: deleteCredentials,
  fetchGroups: fetchGroups,
};
function _0x2596() {
  const _0x4065b9 = [
    "8RoZUNp",
    "status",
    "parse",
    "Check\x20your\x20parameter",
    "941465qgsoOk",
    "end",
    "756911mJhfMv",
    "Check\x20your\x20whatsapp\x20connection",
    "deleteCredentials",
    "5HzsFDO",
    "sendMedia",
    "send",
    "connectToWhatsApp",
    "20PolFlj",
    "13010805MmZMNo",
    "sendText",
    "Processing",
    "log",
    "../whatsapp",
    "Check\x20your\x20parameterr",
    "3025688pWpgBF",
    "14252623OeWcXI",
    "3756878xojxrm",
    "Token\x20needed",
    "body",
    "sendButtonMessage",
    "10948314MXyTrm",
    "3dfpNtD",
    "sendListMessage",
  ];
  _0x2596 = function () {
    return _0x4065b9;
  };
  return _0x2596();
}
