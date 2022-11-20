const Joi = require("joi");

exports.RegisterSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.LoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

