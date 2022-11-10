const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

const signupSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  username: Joi.string().min(4).required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .min(8)
    .required(),
});

module.exports = signupSchema;
