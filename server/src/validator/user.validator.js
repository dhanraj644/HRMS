import joi from "joi"

const userCreateValidator = joi.object({

    userName: joi.string()
    .min(3)
    .max(30)
    .required(),

    email:joi.string()
    .email()
    .required(),

    password : joi.string()
    .min(8)
    .required(),

    role_id: joi.string()
    .required()
})


export default userCreateValidator