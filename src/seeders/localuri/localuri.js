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
    address: 'Shopping Street, Iași',
    priceType: 'Moderat',
    placeType: 'Restaurant',
    kitchenType: 'Internațională',
    uniqueLink: 'moo-bistro',
    rating: 0,
    totalReviews: 0,
    openHour: 10,
    closeHour: 0,
    lat: 47.155412,
    lng: 27.587642
  },
  {
    id: 2,
    img: placeCard2,
    name: 'Cafeneaua Piața Unirii',
    address: 'Piața Unirii nr. 6, Iași',
    priceType: 'Moderat',
    placeType: 'Cafenea',
    kitchenType: 'Internațională',
    uniqueLink: 'cafeneaua-piata-unirii',
    rating: 0,
    totalReviews: 0,
    openHour: 9,
    closeHour: 5,
    lat: 47.166128,
    lng: 27.580752
  },
  {
    id: 3,
    img: placeCard3,
    name: 'Legends pub',
    address: 'Strada Grigore Ureche nr. 27, Iași',
    priceType: 'Accesibil',
    placeType: 'Pub',
    kitchenType: 'Americană',
    uniqueLink: 'legends-pub',
    rating: 0,
    totalReviews: 0,
    openHour: 10,
    closeHour: 1,
    lat: 47.158746,
    lng: 27.588674
  },
  {
    id: 4,
    img: placeCard4,
    name: 'Fenice',
    address: '3F, Strada Palas, Iași',
    priceType: 'Premium',
    placeType: 'Restaurant',
    kitchenType: 'Mediteraneană',
    uniqueLink: 'fenice',
    rating: 0,
    totalReviews: 0,
    openHour: 9,
    closeHour: 1,
    lat: 47.155681,
    lng: 27.586668
  },
  {
    id: 5,
    img: placeCard5,
    name: 'Dionisos',
    address: 'Strada Smârdan nr. 1, Iași',
    priceType: 'Accesibil',
    placeType: 'Restaurant',
    kitchenType: 'Grecească',
    uniqueLink: 'dionisos',
    rating: 0,
    totalReviews: 0,
    openHour: 10,
    closeHour: 1,
    lat: 47.158447,
    lng : 27.600412
  },
  {
    id: 6,
    img: placeCard6,
    name: 'B2',
    address: 'Bd-ul Stefan cel Mare nr. 14, et. 2 Langa CUB, Iași',
    priceType: 'Accesibil',
    placeType: 'Bar',
    kitchenType: null,
    uniqueLink: 'b2',
    rating: 0,
    totalReviews: 0,
    openHour: 10,
    closeHour: 1,
    lat: 47.162337,
    lng: 27.582306
  },
  {
    id: 7,
    img: placeCard7,
    name: 'La Folie',
    address: 'Strada Palas, Iași',
    priceType: 'Moderat',
    placeType: 'Cafenea',
    kitchenType: 'Franțuzească',
    uniqueLink: 'la-folie',
    rating: 0,
    totalReviews: 0,
    openHour: 10,
    closeHour: 0,
    lat: 47.158329,
    lng: 27.589818
  },
  {
    id: 8,
    img: placeCard8,
    name: 'Fika',
    address: 'Piața Unirii nr. 7, Iași',
    priceType: 'Moderat',
    placeType: 'Cafenea',
    kitchenType: null,
    uniqueLink: 'fika',
    rating: 0,
    totalReviews: 0,
    openHour: 8,
    closeHour: 22,
    lat: 47.165192,
    lng: 27.579972
  }
];
