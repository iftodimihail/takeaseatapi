import {version} from '../package.json';
import {Router} from 'express';

import users from './controllers/users';
import restaurantTypes from './controllers/restaurant_types';
import kitchenTypes from './controllers/kitchen_types';
import priceTypes from './controllers/price_types';
import ratingTypes from './controllers/rating_types';
import localuri from './controllers/localuri';
import reservations from './controllers/reservations';

import authenticate from './concerns/authenticate';
import authentication from './controllers/authentication';

export default (db) => {
  const api = new Router();

  api.use('/auth', authentication(db));
  api.use('/users', users(db));
  api.use('/restaurant-types', restaurantTypes(db));
  api.use('/kitchen-types', kitchenTypes(db));
  api.use('/price-types', priceTypes(db));
  api.use('/rating-types', ratingTypes(db));
  api.use('/localuri', localuri(db));
  api.use('/reservations', reservations(db));


  api.get('/', (req, res) => {
    res.json({version});
  });

  return api;
};
