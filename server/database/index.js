const _0x56af22 = _0x25e0;
(function (_0x3f4dd5, _0x17b6f1) {
  const _0x27875a = _0x25e0,
    _0x25e948 = _0x3f4dd5();
  while (!![]) {
    try {
      const _0xaf9611 =
        (-parseInt(_0x27875a(0x11b)) / 0x1) *
          (-parseInt(_0x27875a(0x117)) / 0x2) +
        parseInt(_0x27875a(0x119)) / 0x3 +
        (parseInt(_0x27875a(0x11a)) / 0x4) *
          (parseInt(_0x27875a(0x123)) / 0x5) +
        (parseInt(_0x27875a(0x122)) / 0x6) *
          (-parseInt(_0x27875a(0x114)) / 0x7) +
        parseInt(_0x27875a(0x113)) / 0x8 +
        parseInt(_0x27875a(0x11d)) / 0x9 +
        -parseInt(_0x27875a(0x124)) / 0xa;
      if (_0xaf9611 === _0x17b6f1) break;
      else _0x25e948["push"](_0x25e948["shift"]());
    } catch (_0x290b42) {
      _0x25e948["push"](_0x25e948["shift"]());
    }
  }
})(_0x3bfa, 0xb1f28);
function _0x3bfa() {
  const _0x492d68 = [
    "env",
    "UPDATE\x20devices\x20SET\x20status\x20=\x20\x27",
    "DB_PASSWORD",
    "\x27\x20WHERE\x20body\x20=\x20",
    "30RvyuVK",
    "15AcOvHw",
    "9511040GbVNMe",
    "DB_DATABASE",
    "config",
    "927744PDSCiO",
    "2030945ViUUci",
    "mysql2",
    "createPool",
    "9444mMVEDu",
    "dotenv",
    "490476RzdDCW",
    "911948ptSivk",
    "229CkVWaC",
    "DB_HOST",
    "9773028DhHLJj",
  ];
  _0x3bfa = function () {
    return _0x492d68;
  };
  return _0x3bfa();
}
const mysql2 = require(_0x56af22(0x115));
require(_0x56af22(0x118))[_0x56af22(0x112)]();
const db = mysql2[_0x56af22(0x116)]({
    host: process[_0x56af22(0x11e)][_0x56af22(0x11c)],
    user: process[_0x56af22(0x11e)]["DB_USERNAME"],
    database: process[_0x56af22(0x11e)][_0x56af22(0x125)],
    password: process[_0x56af22(0x11e)][_0x56af22(0x120)],
    waitForConnections: !![],
    connectionLimit: 0xa,
    queueLimit: 0x0,
  }),
  setStatus = (_0xf6e91c, _0x966035) => {
    const _0x3905b4 = _0x56af22;
    try {
      return (
        db["query"](
          _0x3905b4(0x11f) + _0x966035 + _0x3905b4(0x121) + _0xf6e91c + "\x20"
        ),
        !![]
      );
    } catch (_0x18477c) {
      return ![];
    }
  };
function _0x25e0(_0x2dff47, _0x33a8b5) {
  const _0x3bfa9f = _0x3bfa();
  return (
    (_0x25e0 = function (_0x25e018, _0x16c474) {
      _0x25e018 = _0x25e018 - 0x112;
      let _0x16d185 = _0x3bfa9f[_0x25e018];
      return _0x16d185;
    }),
    _0x25e0(_0x2dff47, _0x33a8b5)
  );
}
function dbQuery(_0x23794d) {
  return new Promise((_0x119cfc) => {
    db["query"](_0x23794d, (_0x44e271, _0x552708) => {
      if (_0x44e271) throw _0x44e271;
      try {
        _0x119cfc(_0x552708);
      } catch (_0x3dcf06) {
        _0x119cfc({});
      }
    });
  });
}
module["exports"] = { setStatus: setStatus, dbQuery: dbQuery, db: db };
