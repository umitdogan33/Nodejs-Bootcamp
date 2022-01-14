const Joi = require("joi")

const createValidation = Joi.object({
    title:Joi.string().required().min(3),
    section_id:Joi.string().required(),
    project_id:Joi.string().required(),
    description: Joi.string(),
    assigned_to: Joi.string(),
    due_date: Joi.date(),
    statuses: Joi.array(),
    order: Joi.number(),
    isComplated: Joi.boolean(),
    comments: Joi.array(),
    media: Joi.array(),
    sub_tasks: Joi.array()
})

const updateValidation = Joi.object({
    title:Joi.string().min(3),
    section_id:Joi.string(),
    project_id:Joi.string(),
    description: Joi.string(),
    assigned_to: Joi.string(),
    due_date: Joi.date(),
    statuses: Joi.array(),
    order: Joi.number(),
    isComplated: Joi.boolean(),
    comments: Joi.array(),
    media: Joi.array(),
    sub_tasks: Joi.array()})


    const commentValidation = Joi.object({
        comment: Joi.string()})
    
module.exports={
    createValidation,
    updateValidation,
    commentValidation
}
