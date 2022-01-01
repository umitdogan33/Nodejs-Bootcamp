const Joi = require("joi");

const CreateValidation = Joi.object({
    full_name:Joi.string().required().min(2),
    password:Joi.string().required().min(8),
    email:Joi.string().required().min(8),
})

const LoginValidation = Joi.object({
    password:Joi.string().required().min(8),
    email:Joi.string().required().min(8),
})


module.exports={
    CreateValidation,
    LoginValidation,
}