// npm install @hapi/joi :  package for validations

// VALIDATION
const joi = require("@hapi/joi");

// Register Validations
const registerValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// login Validations
const loginValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(6).required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
