"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return {
    id: data._id,
    name: data.name,
    img: data.img,
    address: data.address,
    priceType: data.priceType,
    placeType: data.placeType,
    kitchenType: data.kitchenType,
    uniqueLink: data.uniqueLink
  };
};
//# sourceMappingURL=localuri.js.map