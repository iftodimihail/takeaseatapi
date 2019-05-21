'use strict';

var Module = require('module');
var fs = require('fs');

Module._extensions['.jpg'] = function (module, fn) {
  var base64 = fs.readFileSync(fn).toString('base64');
  module._compile('module.exports="data:image/jpg;base64,' + base64 + '"', fn);
};

var placeCard1 = require('../../images/place-cards/place-card1.jpg');
var placeCard2 = require('../../images/place-cards/place-card2.jpg');
var placeCard3 = require('../../images/place-cards/place-card3.jpg');
var placeCard4 = require('../../images/place-cards/place-card4.jpg');
var placeCard5 = require('../../images/place-cards/place-card5.jpg');
var placeCard6 = require('../../images/place-cards/place-card6.jpg');
var placeCard7 = require('../../images/place-cards/place-card7.jpg');
var placeCard8 = require('../../images/place-cards/place-card8.jpg');

module.exports = [{
  id: 1,
  img: placeCard1,
  name: 'Moo Bistro',
  address: 'Lorem ipsum',
  priceType: 'Moderat',
  placeType: 'Cafenea',
  kitchenType: 'Random',
  uniqueLink: 'moo-bistro'
}, {
  id: 2,
  img: placeCard2,
  name: 'Cafeneaua Piața Unirii',
  address: 'Lorem ipsum',
  priceType: 'Moderat',
  placeType: 'Cafenea',
  kitchenType: 'Random',
  uniqueLink: 'cafeneaua-piața-unirii'
}, {
  id: 3,
  img: placeCard3,
  name: 'Legends pub',
  address: 'Lorem ipsum',
  priceType: 'Moderat',
  placeType: 'Cafenea',
  kitchenType: 'Random',
  uniqueLink: 'legends-pub'
}, {
  id: 4,
  img: placeCard4,
  name: 'Fenice',
  address: 'Lorem ipsum',
  priceType: 'Moderat',
  placeType: 'Cafenea',
  kitchenType: 'Random',
  uniqueLink: 'fenice'
}, {
  id: 5,
  img: placeCard5,
  name: 'Dionisos',
  address: 'Lorem ipsum',
  priceType: 'Moderat',
  placeType: 'Cafenea',
  kitchenType: 'Random',
  uniqueLink: 'dionisos'
}, {
  id: 6,
  img: placeCard6,
  name: 'Taverna',
  address: 'Lorem ipsum',
  priceType: 'Moderat',
  placeType: 'Cafenea',
  kitchenType: 'Random',
  uniqueLink: 'taverna'
}, {
  id: 7,
  img: placeCard7,
  name: 'Square',
  address: 'Lorem ipsum',
  priceType: 'Moderat',
  placeType: 'Cafenea',
  kitchenType: 'Random',
  uniqueLink: 'square'
}, {
  id: 8,
  img: placeCard8,
  name: 'Fika',
  address: 'Lorem ipsum',
  priceType: 'Moderat',
  placeType: 'Cafenea',
  kitchenType: 'Random',
  uniqueLink: 'fika'
}];
//# sourceMappingURL=localuri.js.map