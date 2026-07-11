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


const updateUserValidator = joi.object({

    userName: joi.string()
        .min(3)
        .max(30),

    email: joi.string()
        .email(),

    password: joi.string()
        .min(8),

    role_id: joi.string()
        .hex()
        .length(24),

    is_active: joi.string()
        .valid("Active", "Inactive")

}).min(1);

const updateStatusValidator = joi.object({
       is_active: joi.string()
        .valid("Active", "Inactive")
        .required()
})

const updateUserPassword = joi.object({
    password : joi.string()
    .min(8)
    .required()
})


export {userCreateValidator , updateUserValidator,updateStatusValidator,updateUserPassword}