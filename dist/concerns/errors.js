'use strict';

var changeCase = require('change-case');

var prepareFieldName = function prepareFieldName(message) {
  var elements = message.split('"');
  return '' + changeCase.titleCase(elements[1]) + elements[2];
};

var formatValidationErrors = function formatValidationErrors(errors) {
  var errorsObj = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var error = _step.value;

      if (error['field'].length === 1) {
        errorsObj[error['field'][0]] = [prepareFieldName(error['messages'][0])];
      } else {
        var fieldName = error['field'].join('.');
        errorsObj[fieldName] = [prepareFieldName(error['messages'][0])];
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return errorsObj;
};

module.exports = {
  formatValidationErrors: formatValidationErrors
};
//# sourceMappingURL=errors.js.map