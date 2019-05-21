'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  store: {
    body: {
      local_id: _joi2.default.number().integer().required()
    }
  },
  update: {
    id: _joi2.default.number().integer().required()
  }
};
//# sourceMappingURL=reservations.js.map