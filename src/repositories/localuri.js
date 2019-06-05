import localuriModel from '../models/localuri';

const moment = require('moment');
const mongoDB = require('mongodb');

export default (db) => {

  const index = async () => {
    try {
      return await localuriModel(db).find().toArray();
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
      return await localuriModel(db).insertOne(body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const show = async (uniqueLink) => {
    try {
      return await localuriModel(db).findOne({uniqueLink});
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const showById = async (id) => {
    try {
      return await localuriModel(db).findOne({_id: parseInt(id)});
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const showByField = async (field, value) => {
    try {
      return await localuriModel(db).find({[field]: { $regex: value, $options : 'i' }}).toArray();
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
      return await localuriModel(db).findOneAndUpdate({_id: mongoDB.ObjectId(id)}, body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const destroy = async (id) => {
    try {
      return await localuriModel(db).findOneAndDelete({_id: mongoDB.ObjectId(id)});
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateOnReview = async (id, body) => {
    try {
      const now = moment().unix();
      body.created_at = now;
      body.updated_at = now;
      return await localuriModel(db).findOneAndUpdate({_id: id},
        {
          $inc: { totalReviews: 1, rating: body.rating }
        });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    index,
    store,
    show,
    showById,
    showByField,
    update,
    destroy,
    updateOnReview
  };
}
