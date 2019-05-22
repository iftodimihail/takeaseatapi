import Joi from 'joi';

export default {
  store: {
    body: {
      rating: Joi.number().integer().required(),
      review_text: Joi.string(),
      local_id: Joi.number().integer().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
    }
  },
  update: {
    body: {
      rating: Joi.number().integer().required(),
      review_text: Joi.string(),
      local_id: Joi.number().integer().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
    }
  }
};
