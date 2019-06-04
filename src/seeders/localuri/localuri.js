const Module = require('module');
const fs     = require('fs');

Module._extensions['.jpg'] = function(module, fn) {
  const base64 = fs.readFileSync(fn).toString('base64');
  module._compile('module.exports="data:image/jpg;base64,' + base64 + '"', fn);
};

const placeCard1 = require('../../images/place-cards/place-card1.jpg');
const placeCard2 = require('../../images/place-cards/place-card2.jpg');
const placeCard3 = require('../../images/place-cards/place-card3.jpg');
const placeCard4 = require('../../images/place-cards/place-card4.jpg');
const placeCard5 = require('../../images/place-cards/place-card5.jpg');
const placeCard6 = require('../../images/place-cards/place-card6.jpg');
const placeCard7 = require('../../images/place-cards/place-card7.jpg');
const placeCard8 = require('../../images/place-cards/place-card8.jpg');

module.exports = [
  {
    id: 1,
    img: placeCard1,
    name: 'Moo Bistro',
    address: 'Lorem ipsum',
    priceType: 'Moderat',
    placeType: 'Restaurant',
    kitchenType: 'Random',
    uniqueLink: 'moo-bistro',
    rating: 0,
    totalReviews: 0
  },
  {
    id: 2,
    img: placeCard2,
    name: 'Cafeneaua Piața Unirii',
    address: 'Lorem ipsum',
    priceType: 'Moderat',
    placeType: 'Cafenea',
    kitchenType: 'Random',
    uniqueLink: 'cafeneaua-piața-unirii',
    rating: 0,
    totalReviews: 0
  },
  {
    id: 3,
    img: placeCard3,
    name: 'Legends pub',
    address: 'Lorem ipsum',
    priceType: 'Accesibil',
    placeType: 'Pub',
    kitchenType: 'Random',
    uniqueLink: 'legends-pub',
    rating: 0,
    totalReviews: 0
  },
  {
    id: 4,
    img: placeCard4,
    name: 'Fenice',
    address: 'Lorem ipsum',
    priceType: 'Premium',
    placeType: 'Cafenea',
    kitchenType: 'Random',
    uniqueLink: 'fenice',
    rating: 0,
    totalReviews: 0
  },
  {
    id: 5,
    img: placeCard5,
    name: 'Dionisos',
    address: 'Lorem ipsum',
    priceType: 'Accesibil',
    placeType: 'Restaurant',
    kitchenType: 'Random',
    uniqueLink: 'dionisos',
    rating: 0,
    totalReviews: 0
  },
  {
    id: 6,
    img: placeCard6,
    name: 'Taverna',
    address: 'Lorem ipsum',
    priceType: 'Accesibil',
    placeType: 'Bar',
    kitchenType: 'Random',
    uniqueLink: 'taverna',
    rating: 0,
    totalReviews: 0
  },
  {
    id: 7,
    img: placeCard7,
    name: 'Square',
    address: 'Lorem ipsum',
    priceType: 'Moderat',
    placeType: 'Cafenea',
    kitchenType: 'Random',
    uniqueLink: 'square',
    rating: 0,
    totalReviews: 0
  },
  {
    id: 8,
    img: placeCard8,
    name: 'Fika',
    address: 'Lorem ipsum',
    priceType: 'Moderat',
    placeType: 'Cafenea',
    kitchenType: 'Random',
    uniqueLink: 'fika',
    rating: 0,
    totalReviews: 0
  }
];
