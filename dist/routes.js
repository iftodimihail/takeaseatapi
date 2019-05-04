'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../package.json');

var _express = require('express');

var _users = require('./controllers/users');

var _users2 = _interopRequireDefault(_users);

var _restaurant_types = require('./controllers/restaurant_types');

var _restaurant_types2 = _interopRequireDefault(_restaurant_types);

var _kitchen_types = require('./controllers/kitchen_types');

var _kitchen_types2 = _interopRequireDefault(_kitchen_types);

var _price_types = require('./controllers/price_types');

var _price_types2 = _interopRequireDefault(_price_types);

var _rating_types = require('./controllers/rating_types');

var _rating_types2 = _interopRequireDefault(_rating_types);

var _localuri = require('./controllers/localuri');

var _localuri2 = _interopRequireDefault(_localuri);

var _reservations = require('./controllers/reservations');

var _reservations2 = _interopRequireDefault(_reservations);

var _authenticate = require('./concerns/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _authentication = require('./controllers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db) {
  var api = new _express.Router();

  api.use('/auth', (0, _authentication2.default)(db));
  api.use('/users', (0, _users2.default)(db));
  api.use('/restaurant-types', (0, _restaurant_types2.default)(db));
  api.use('/kitchen-types', (0, _kitchen_types2.default)(db));
  api.use('/price-types', (0, _price_types2.default)(db));
  api.use('/rating-types', (0, _rating_types2.default)(db));
  api.use('/localuri', (0, _localuri2.default)(db));
  api.use('/reservations', (0, _reservations2.default)(db));

  api.get('/', function (req, res) {
    res.json({ version: _package.version });
  });

  return api;
};
//# sourceMappingURL=routes.js.map