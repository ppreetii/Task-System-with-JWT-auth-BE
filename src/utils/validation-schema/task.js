const Joi = require("joi");

exports.TaskSchema = Joi.object()
  .keys({
    title: Joi.string().min(5).max(20).required(),
    due_date: Joi.date().required(),
    attachment: Joi.string().required(),
    user: Joi.number().integer().required()
  })
  .required();
