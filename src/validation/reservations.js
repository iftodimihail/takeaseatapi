import Joi from 'joi';

export default {
  store: {
    body: {
      local_id: Joi.number().integer().required(),
    }
  },
  update: {
    body: {
      local_id: Joi.number().integer().required(),
    }
  }
};
