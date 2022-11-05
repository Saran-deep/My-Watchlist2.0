const Joi = require("joi");

const signupSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  username: Joi.string().min(4).required(),
  password: Joi.string().min(6).required(),
});

module.exports = signupSchema;
