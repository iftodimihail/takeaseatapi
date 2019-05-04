'use strict';

var fs = require('fs');

var imageToBase64 = function imageToBase64(imagePath) {
  return fs.readFileSync(imagePath, 'base64');
};

module.exports = {
  imageToBase64: imageToBase64
};
//# sourceMappingURL=utils.js.map