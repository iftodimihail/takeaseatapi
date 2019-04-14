'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('../repositories/user');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('../transformers/user');

var _user4 = _interopRequireDefault(_user3);

var _response = require('../concerns/response');

var _response2 = _interopRequireDefault(_response);

var _authentication = require('../validation/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (db) {

  var api = new _express.Router();

  /**
   * Registers a user
   * @swagger
   * /api/auth/register:
   *   post:
   *     tags:
   *       - Authentication
   *     name: Register
   *     summary: Register as a user
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             email:
   *               type: string
   *             password:
   *               type: string
   *               format: password
   *         required:
   *           - name
   *           - email
   *           - password
   *     responses:
   *       200:
   *         description: A user object
   *       403:
   *         description: Invalid email or password
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/register', (0, _expressValidation2.default)(_authentication2.default.register), function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _user2.default)(db).store(req.body);

            case 3:
              user = _context.sent.ops[0];
              return _context.abrupt('return', (0, _response2.default)(res).item(user, _user4.default));

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', (0, _response2.default)(res).error(_context.t0));

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  /**
   * Logs in a user
   * @swagger
   * /api/auth/login:
   *   post:
   *     tags:
   *       - Authentication
   *     name: Log in
   *     summary: Logs in a user
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             email:
   *               type: string
   *             password:
   *               type: string
   *               format: password
   *         required:
   *           - email
   *           - password
   *     responses:
   *       200:
   *         description: A user object with a token
   *       403:
   *         description: Invalid email or password
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/login', (0, _expressValidation2.default)(_authentication2.default.login), function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var user, passwordMatch, token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              user = void 0;
              _context2.prev = 1;
              _context2.next = 4;
              return (0, _user2.default)(db).getByEmail(req.body.email);

            case 4:
              user = _context2.sent;
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](1);
              return _context2.abrupt('return', (0, _response2.default)(res).internalError('Could not get user'));

            case 10:
              if (user) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt('return', (0, _response2.default)(res).forbidden('Invalid email or password'));

            case 12:
              _context2.prev = 12;
              _context2.next = 15;
              return (0, _user2.default)(db).comparePassword(req.body.password, user.password);

            case 15:
              passwordMatch = _context2.sent;

              if (passwordMatch) {
                _context2.next = 18;
                break;
              }

              return _context2.abrupt('return', (0, _response2.default)(res).forbidden('Invalid email or password'));

            case 18:
              _context2.next = 23;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t1 = _context2['catch'](12);
              return _context2.abrupt('return', (0, _response2.default)(res).error(_context2.t1));

            case 23:
              _context2.prev = 23;
              _context2.next = 26;
              return _jsonwebtoken2.default.sign(user, process.env.AUTH_SECRET, {
                expiresIn: process.env.AUTH_EXPIRES_IN
              });

            case 26:
              token = _context2.sent;
              return _context2.abrupt('return', (0, _response2.default)(res).item(user, _user4.default, null, { token: token }));

            case 30:
              _context2.prev = 30;
              _context2.t2 = _context2['catch'](23);
              return _context2.abrupt('return', (0, _response2.default)(res).error(_context2.t2));

            case 33:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[1, 7], [12, 20], [23, 30]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  return api;
};
//# sourceMappingURL=authentication.js.map