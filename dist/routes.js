'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../package.json');

var _express = require('express');

var _users = require('./controllers/users');

var _users2 = _interopRequireDefault(_users);

var _authenticate = require('./concerns/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _authentication = require('./controllers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db) {
  var api = new _express.Router();

  api.use('/auth', (0, _authentication2.default)(db));
  api.use('/users', _authenticate2.default, (0, _users2.default)(db));

  api.get('/', function (req, res) {
    res.json({ version: _package.version });
  });

  return api;
};
//# sourceMappingURL=routes.js.map