import restaurantTypesModel from '../models/restaurant_types';

const moment = require('moment');
const mongoDB = require('mongodb');

export default (db) => {

  const index = async () => {
    try {
      return await restaurantTypesModel(db).find().toArray();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const store = async (body) => {
    try {
      const now = moment().unix();
      body.created_at = now;
      body.updated_at = now;
      return await restaurantTypesModel(db).insertOne(body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const show = async (id) => {
    try {
      return await restaurantTypesModel(db).findOne({_id: mongoDB.ObjectId(id)});
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const update = async (id, body) => {
    try {
      const now = moment().unix();
      body.created_at = now;
      body.updated_at = now;
      return await restaurantTypesModel(db).findOneAndUpdate({_id: mongoDB.ObjectId(id)}, body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const destroy = async (id) => {
    try {
      return await restaurantTypesModel(db).findOneAndDelete({_id: mongoDB.ObjectId(id)});
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    index,
    store,
    show,
    update,
    destroy
  };
}
