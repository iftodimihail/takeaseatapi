const fs = require('fs');

const imageToBase64 = (imagePath) => fs.readFileSync(imagePath, 'base64');

module.exports = {
  imageToBase64
};
