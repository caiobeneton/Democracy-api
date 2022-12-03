import joi from "joi"

export const pollSchema = joi.object({
    title: joi.string().required().min(3),
    expireAt: joi.string().allow("", null)
})