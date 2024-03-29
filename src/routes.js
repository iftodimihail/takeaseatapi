import {version} from '../package.json';
import {Router} from 'express';

import admins from './controllers/admins';
import placeTypes from './controllers/place_types';
import kitchenTypes from './controllers/kitchen_types';
import priceTypes from './controllers/price_types';
import ratingTypes from './controllers/rating_types';
import localuri from './controllers/localuri';
import reservations from './controllers/reservations';
import reviews from './controllers/reviews';

import authentication from './controllers/authentication';

export default (db) => {
  const api = new Router();

  api.use('/auth', authentication(db));
  api.use('/admins', admins(db));
  api.use('/place-types', placeTypes(db));
  api.use('/kitchen-types', kitchenTypes(db));
  api.use('/price-types', priceTypes(db));
  api.use('/rating-types', ratingTypes(db));
  api.use('/localuri', localuri(db));
  api.use('/reservations', reservations(db));
  api.use('/reviews', reviews(db));

  api.get('/', (req, res) => {
    res.json({version});
  });

  return api;
};
