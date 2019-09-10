const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }

    //Data validation
    return Joi.validate(data, schema, { abortEarly: false });
};

//Login validation
const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }

    //Data validation
    return Joi.validate(data, schema, { abortEarly: false });
};

module.exports.registerValidation = registerValidation;
module.exports.registerLogin = loginValidation;
