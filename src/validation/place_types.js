import Joi from 'joi';

export default {
  store: {
    body: {
      name: Joi.string().required(),
    }
  },
  update: {
    body: {
      name: Joi.string().required(),
    }
  }
};
