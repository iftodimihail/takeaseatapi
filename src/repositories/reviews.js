import reviewsModel from '../models/reviews';

const moment = require('moment');
const mongoDB = require('mongodb');

export default (db) => {

  const index = async () => {
    try {
      return await reviewsModel(db).find().toArray();
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
      return await reviewsModel(db).insertOne(body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const show = async (id) => {
    try {
      return await reviewsModel(db).findOne({_id: mongoDB.ObjectId(id)});
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
      return await reviewsModel(db).findOneAndUpdate({_id: mongoDB.ObjectId(id)}, { $set: body });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const destroy = async (id) => {
    try {
      return await reviewsModel(db).findOneAndDelete({_id: mongoDB.ObjectId(id)});
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
