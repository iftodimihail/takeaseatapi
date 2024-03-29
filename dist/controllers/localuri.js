'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _response = require('../concerns/response');

var _response2 = _interopRequireDefault(_response);

var _localuri = require('../repositories/localuri');

var _localuri2 = _interopRequireDefault(_localuri);

var _localuri3 = require('../transformers/localuri.js');

var _localuri4 = _interopRequireDefault(_localuri3);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (db) {

  var api = new _express.Router();

  /**
   * List all resources
   * @swagger
   * /api/localuri:
   *   get:
   *     tags:
   *       - Localuri
   *     name: List localuri
   *     summary: Lists all the localuri
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of localuri objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', (0, _cors2.default)(), function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var local, localuri;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!req.query.id) {
                _context.next = 8;
                break;
              }

              _context.next = 4;
              return (0, _localuri2.default)(db).showById(req.query.id);

            case 4:
              local = _context.sent;
              return _context.abrupt('return', (0, _response2.default)(res).item(local, _localuri4.default));

            case 8:
              _context.next = 10;
              return (0, _localuri2.default)(db).index();

            case 10:
              localuri = _context.sent;
              return _context.abrupt('return', (0, _response2.default)(res).collection(localuri, _localuri4.default));

            case 12:
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', (0, _response2.default)(res).error(_context.t0));

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 14]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  /**
   * Show an existing resource
   * @swagger
   * /api/localuri/{uniqueLink}:
   *   get:
   *     tags:
   *       - Localuri
   *     name: Show localuri
   *     summary: Shows an existing localuri
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: uniqueLink
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - uniqueLink
   *     responses:
   *       200:
   *         description: A localuri object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:uniqueLink', (0, _cors2.default)(), function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var localuri;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _localuri2.default)(db).show(req.params.uniqueLink);

            case 3:
              localuri = _context2.sent;
              return _context2.abrupt('return', (0, _response2.default)(res).item(localuri, _localuri4.default));

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](0);
              return _context2.abrupt('return', (0, _response2.default)(res).error(_context2.t0));

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 7]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  return api;
};
//# sourceMappingURL=localuri.js.map