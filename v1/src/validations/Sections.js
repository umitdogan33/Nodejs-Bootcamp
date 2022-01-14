const Joi = require("joi")

const createValidation = Joi.object({
    name:Joi.string().required().min(2),
    project_id:Joi.string().required()
})

const updateValidation = Joi.object({
    name:Joi.string(),
    project_id:Joi.string(),
})

module.exports={
    createValidation,
    updateValidation
}
