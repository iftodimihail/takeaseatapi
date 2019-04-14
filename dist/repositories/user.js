'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var moment = require('moment');
var mongoDB = require('mongodb');

exports.default = function (db) {

  var index = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _user2.default)(db).find().toArray();

            case 3:
              return _context.abrupt('return', _context.sent);

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](0);

              console.error(_context.t0);
              throw _context.t0;

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 6]]);
    }));

    return function index() {
      return _ref.apply(this, arguments);
    };
  }();

  var store = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(body) {
      var now;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              now = moment().unix();
              _context2.next = 4;
              return hashPassword(body.password);

            case 4:
              body.password = _context2.sent;

              body.created_at = now;
              body.updated_at = now;
              _context2.next = 9;
              return (0, _user2.default)(db).insertOne(body);

            case 9:
              return _context2.abrupt('return', _context2.sent);

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](0);

              console.error(_context2.t0);
              throw _context2.t0;

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 12]]);
    }));

    return function store(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var show = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _user2.default)(db).findOne({ _id: mongoDB.ObjectId(id) }, { password: 0 });

            case 3:
              return _context3.abrupt('return', _context3.sent);

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3['catch'](0);

              console.error(_context3.t0);
              throw _context3.t0;

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 6]]);
    }));

    return function show(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  var update = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, body) {
      var now;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              now = moment().unix();

              body.created_at = now;
              body.updated_at = now;
              _context4.next = 6;
              return (0, _user2.default)(db).findOneAndUpdate({ _id: mongoDB.ObjectId(id) }, body);

            case 6:
              return _context4.abrupt('return', _context4.sent);

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4['catch'](0);

              console.error(_context4.t0);
              throw _context4.t0;

            case 13:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 9]]);
    }));

    return function update(_x3, _x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var destroy = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return (0, _user2.default)(db).findOneAndDelete({ _id: mongoDB.ObjectId(id) });

            case 3:
              return _context5.abrupt('return', _context5.sent);

            case 6:
              _context5.prev = 6;
              _context5.t0 = _context5['catch'](0);

              console.error(_context5.t0);
              throw _context5.t0;

            case 10:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 6]]);
    }));

    return function destroy(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();

  var getByEmail = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(email) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return (0, _user2.default)(db).findOne({ email: email });

            case 3:
              return _context6.abrupt('return', _context6.sent);

            case 6:
              _context6.prev = 6;
              _context6.t0 = _context6['catch'](0);

              console.error(_context6.t0);
              throw _context6.t0;

            case 10:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 6]]);
    }));

    return function getByEmail(_x6) {
      return _ref6.apply(this, arguments);
    };
  }();

  var hashPassword = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(password) {
      var salt;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _bcrypt2.default.genSalt(10);

            case 3:
              salt = _context7.sent;
              _context7.next = 6;
              return _bcrypt2.default.hash(password, salt);

            case 6:
              return _context7.abrupt('return', _context7.sent);

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7['catch'](0);

              console.error(_context7.t0);
              throw _context7.t0;

            case 13:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[0, 9]]);
    }));

    return function hashPassword(_x7) {
      return _ref7.apply(this, arguments);
    };
  }();

  var comparePassword = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(pass, hashedPassword) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _bcrypt2.default.compare(pass, hashedPassword);

            case 3:
              return _context8.abrupt('return', _context8.sent);

            case 6:
              _context8.prev = 6;
              _context8.t0 = _context8['catch'](0);

              console.error(_context8.t0);
              throw _context8.t0;

            case 10:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined, [[0, 6]]);
    }));

    return function comparePassword(_x8, _x9) {
      return _ref8.apply(this, arguments);
    };
  }();

  return {
    index: index,
    store: store,
    show: show,
    update: update,
    destroy: destroy,
    getByEmail: getByEmail,
    comparePassword: comparePassword
  };
};
//# sourceMappingURL=user.js.map