const _0x327b40 = _0xfa9f;
function _0x29b5() {
  const _0x5a6b73 = [
    "exports",
    "set",
    "1556348RXAVgi",
    "9bfSrNV",
    "11604170HsxbSu",
    "6426464zzzPlu",
    "6090465ZeNklT",
    "\x20AND\x20status\x20=\x20\x27Active\x27\x20LIMIT\x201",
    "has",
    "length",
    "./index",
    "SELECT\x20*\x20FROM\x20autoreplies\x20WHERE\x20keyword\x20=\x20\x22",
    "\x27\x20LIMIT\x201",
    "SELECT\x20*\x20FROM\x20devices\x20WHERE\x20body\x20=\x20\x27",
    "webhook",
    "442196qlCjJu",
    "2QrtLnP",
    "\x22)\x20>\x200\x20AND\x20type_keyword\x20=\x20\x27Contain\x27\x20AND\x20device_id\x20=\x20",
    "./../lib/cache",
    "contain",
    "\x22\x20AND\x20type_keyword\x20=\x20\x27Equal\x27\x20AND\x20device_id\x20=\x20",
    "335440XGFxjE",
    "8857672puKFLP",
    "9usYxFD",
    "48HrXYlK",
    "myCache",
    "SELECT\x20*\x20FROM\x20autoreplies\x20WHERE\x20LOCATE(keyword,\x20\x22",
  ];
  _0x29b5 = function () {
    return _0x5a6b73;
  };
  return _0x29b5();
}
(function (_0x1ef0ef, _0x23da24) {
  const _0x26d9e1 = _0xfa9f,
    _0x3ffdd7 = _0x1ef0ef();
  while (!![]) {
    try {
      const _0x2532a5 =
        (parseInt(_0x26d9e1(0xc6)) / 0x1) * (-parseInt(_0x26d9e1(0xc5)) / 0x2) +
        (-parseInt(_0x26d9e1(0xb9)) / 0x3) * (parseInt(_0x26d9e1(0xb8)) / 0x4) +
        parseInt(_0x26d9e1(0xbc)) / 0x5 +
        (-parseInt(_0x26d9e1(0xce)) / 0x6) *
          (-parseInt(_0x26d9e1(0xcb)) / 0x7) +
        -parseInt(_0x26d9e1(0xcc)) / 0x8 +
        (parseInt(_0x26d9e1(0xcd)) / 0x9) * (parseInt(_0x26d9e1(0xba)) / 0xa) +
        parseInt(_0x26d9e1(0xbb)) / 0xb;
      if (_0x2532a5 === _0x23da24) break;
      else _0x3ffdd7["push"](_0x3ffdd7["shift"]());
    } catch (_0x5244cd) {
      _0x3ffdd7["push"](_0x3ffdd7["shift"]());
    }
  }
})(_0x29b5, 0x99ab4);
const { dbQuery } = require(_0x327b40(0xc0)),
  cache = require(_0x327b40(0xc8)),
  myCache = cache[_0x327b40(0xcf)],
  isExistsEqualCommand = async (_0x5319ff, _0x40c3d6) => {
    const _0x506f4a = _0x327b40;
    if (myCache[_0x506f4a(0xbe)](_0x5319ff + _0x40c3d6))
      return myCache["get"](_0x5319ff + _0x40c3d6);
    let _0x58c466 = await dbQuery(
      _0x506f4a(0xc3) + _0x40c3d6 + _0x506f4a(0xc2)
    );
    if (_0x58c466[_0x506f4a(0xbf)] === 0x0) return [];
    let _0xb00bf6 = _0x58c466[0x0]["id"],
      _0x2a0d35 = await dbQuery(
        _0x506f4a(0xc1) +
          _0x5319ff +
          _0x506f4a(0xca) +
          _0xb00bf6 +
          _0x506f4a(0xbd)
      );
    if (_0x2a0d35[_0x506f4a(0xbf)] === 0x0) return [];
    return (
      myCache[_0x506f4a(0xb7)](_0x5319ff + _0x40c3d6, _0x2a0d35), _0x2a0d35
    );
  },
  isExistsContainCommand = async (_0x31d3ff, _0x425cf3) => {
    const _0x45d429 = _0x327b40;
    if (myCache[_0x45d429(0xbe)](_0x45d429(0xc9) + _0x31d3ff + _0x425cf3))
      return myCache["get"](_0x45d429(0xc9) + _0x31d3ff + _0x425cf3);
    let _0x94cb7a = await dbQuery(
      "SELECT\x20*\x20FROM\x20devices\x20WHERE\x20body\x20=\x20\x27" +
        _0x425cf3 +
        "\x27\x20LIMIT\x201"
    );
    if (_0x94cb7a[_0x45d429(0xbf)] === 0x0) return [];
    let _0x150ca = _0x94cb7a[0x0]["id"],
      _0x3a5dce = await dbQuery(
        _0x45d429(0xd0) +
          _0x31d3ff +
          _0x45d429(0xc7) +
          _0x150ca +
          _0x45d429(0xbd)
      );
    if (_0x3a5dce[_0x45d429(0xbf)] === 0x0) return [];
    return (
      myCache["set"](_0x45d429(0xc9) + _0x31d3ff + _0x425cf3, _0x3a5dce),
      _0x3a5dce
    );
  },
  getUrlWebhook = async (_0x20c613) => {
    const _0x33954c = _0x327b40;
    if (myCache[_0x33954c(0xbe)]("webhook" + _0x20c613))
      return myCache["get"](_0x33954c(0xc4) + _0x20c613);
    let _0x487495 = null,
      _0x46be60 = await dbQuery(
        "SELECT\x20webhook\x20FROM\x20devices\x20WHERE\x20body\x20=\x20\x27" +
          _0x20c613 +
          _0x33954c(0xc2)
      );
    return (
      _0x46be60[_0x33954c(0xbf)] > 0x0 &&
        (_0x487495 = _0x46be60[0x0][_0x33954c(0xc4)]),
      myCache["set"](_0x33954c(0xc4) + _0x20c613, _0x487495),
      _0x487495
    );
  };
function _0xfa9f(_0x536612, _0x11f255) {
  const _0x29b5e = _0x29b5();
  return (
    (_0xfa9f = function (_0xfa9fc7, _0x13b8d4) {
      _0xfa9fc7 = _0xfa9fc7 - 0xb6;
      let _0x4b0251 = _0x29b5e[_0xfa9fc7];
      return _0x4b0251;
    }),
    _0xfa9f(_0x536612, _0x11f255)
  );
}
module[_0x327b40(0xb6)] = {
  isExistsEqualCommand: isExistsEqualCommand,
  isExistsContainCommand: isExistsContainCommand,
  getUrlWebhook: getUrlWebhook,
};
