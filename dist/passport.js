'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportJwt = require('passport-jwt');

var _user = require('./repositories/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (db, passport) {
  var opts = {};
  opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.AUTH_SECRET;
  passport.use(new _passportJwt.Strategy(opts, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(jwt_payload, done) {
      var user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user = void 0;
              _context.prev = 1;
              _context.next = 4;
              return (0, _user2.default)(db).getByEmail(jwt_payload.email);

            case 4:
              user = _context.sent;

              if (user) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', done(null, false, { message: 'No user by that email' }));

            case 7:
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](1);
              return _context.abrupt('return', done(_context.t0));

            case 12:
              return _context.abrupt('return', done(null, user));

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 9]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()));
};
//# sourceMappingURL=passport.js.map