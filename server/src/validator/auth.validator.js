import joi from "joi";


const loginValidator = joi.object({
    
    email : joi.string()
    .email()
    .required(),

    password: joi.string()
    .min(8)
    .required()

})


export  {loginValidator}