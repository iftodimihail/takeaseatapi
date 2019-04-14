'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  _passport2.default.authenticate('jwt', { session: false }, function (err, user) {
    if (err) {
      (0, _response2.default)(res).error('Internal server error', 500);
    } else if (!user) {
      (0, _response2.default)(res).unauthorized('Not authorized to access this resource');
    } else {
      req.currentUser = user;
      next();
    }
  })(req, res, next);
};
//# sourceMappingURL=authenticate.js.map