'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _response = require('../concerns/response');

var _response2 = _interopRequireDefault(_response);

var _reservations = require('../repositories/reservations');

var _reservations2 = _interopRequireDefault(_reservations);

var _localuri = require('../repositories/localuri');

var _localuri2 = _interopRequireDefault(_localuri);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _reservations3 = require('../validation/reservations');

var _reservations4 = _interopRequireDefault(_reservations3);

var _reservations5 = require('../transformers/reservations');

var _reservations6 = _interopRequireDefault(_reservations5);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _utils = require('../utils');

var _qrcode = require('qrcode');

var _qrcode2 = _interopRequireDefault(_qrcode);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _moment = require('moment/moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var transporter = _nodemailer2.default.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9ac93167c76550",
    pass: "fddc5c5f4567c4"
  }
});

exports.default = function (db) {

  var api = new _express.Router();

  /**
   * List all resources
   * @swagger
   * /api/reservations:
   *   get:
   *     tags:
   *       - Reservations
   *     name: List reservations
   *     summary: Lists all the reservations
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of reservation objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var reservations;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _reservations2.default)(db).index();

            case 3:
              reservations = _context.sent;
              return _context.abrupt('return', (0, _response2.default)(res).collection(reservations, _reservations6.default));

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
   * Create a new resource
   * @swagger
   * /api/reservations:
   *   post:
   *     tags:
   *       - Reservations
   *     name: Create reservation
   *     summary: Creates a new reservation
   *     security:
   *       - bearerAuth: []
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
   *             local_id:
   *               type: integer
   *         required:
   *           - local_id
   *     responses:
   *       200:
   *         description: A reservation object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/', (0, _cors2.default)(), (0, _expressValidation2.default)(_reservations4.default.store), function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var reservation, resObj, place;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _reservations2.default)(db).store(req.body);

            case 3:
              reservation = _context3.sent.ops;
              resObj = reservation[0];
              _context3.next = 7;
              return (0, _localuri2.default)(db).showById(resObj.local_id);

            case 7:
              place = _context3.sent;


              _qrcode2.default.toDataURL('https://nice-snail-27.localtunnel.me/reservation/' + resObj._id, function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, url) {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return transporter.sendMail({
                            from: '"Take-A-Seat" <reservations@takeaseat.com>', // sender address
                            to: resObj.email, // list of receivers
                            subject: 'TakeASeat Rezervare ' + place.name, // Subject line
                            text: resObj.last_name + ' hai in coace pe data de ' + resObj.date, // plain text body
                            html: (0, _utils.emailTemplate)(resObj, place, url) // html body
                          });

                        case 2:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function (_x5, _x6) {
                  return _ref3.apply(this, arguments);
                };
              }());
              return _context3.abrupt('return', (0, _response2.default)(res).item(resObj, _reservations6.default));

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', (0, _response2.default)(res).error(_context3.t0));

            case 15:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 12]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  /**
   * Show an existing resource
   * @swagger
   * /api/reservations/{id}:
   *   get:
   *     tags:
   *       - Reservations
   *     name: Show reservation
   *     summary: Shows an existing reservation
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A reservation object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var reservation;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _reservations2.default)(db).show(req.params.id);

            case 3:
              reservation = _context4.sent;
              return _context4.abrupt('return', (0, _response2.default)(res).item(reservation, _reservations6.default));

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4['catch'](0);
              return _context4.abrupt('return', (0, _response2.default)(res).error(_context4.t0));

            case 10:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 7]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  /**
   * Update an existing resource
   * @swagger
   * /api/reservations/{id}:
   *   put:
   *     tags:
   *       - Reservations
   *     name: Update reservation
   *     summary: Updates an existing reservation
   *     security:
   *       - bearerAuth: []
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
   *         required:
   *           - name
   *           - email
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A reservation object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.put('/:id', (0, _expressValidation2.default)(_reservations4.default.update), function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var reservation;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              console.log(req.params.id, req.body);
              _context5.next = 4;
              return (0, _reservations2.default)(db).update(req.params.id, req.body);

            case 4:
              reservation = _context5.sent;
              return _context5.abrupt('return', (0, _response2.default)(res).item(reservation, _reservations6.default));

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5['catch'](0);
              return _context5.abrupt('return', (0, _response2.default)(res).error(_context5.t0));

            case 11:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 8]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  /**
   * Destroy an existing resource
   * @swagger
   * /api/reservations/{id}:
   *   delete:
   *     tags:
   *       - Reservations
   *     name: Delete reservation
   *     summary: Deletes an existing reservation
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A reservation object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.delete('/:id', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var reservation;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return (0, _reservations2.default)(db).destroy(req.params.id);

            case 3:
              reservation = _context6.sent;
              return _context6.abrupt('return', (0, _response2.default)(res).item(reservation, _reservations6.default));

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6['catch'](0);
              return _context6.abrupt('return', (0, _response2.default)(res).error(_context6.t0));

            case 10:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 7]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  return api;
};
//# sourceMappingURL=reservations.js.map