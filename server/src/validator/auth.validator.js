import joi from "joi";


const loginValidator = joi.object({
    
    email : joi.string()
    .email()
    .required(),

    password: joi.String()
    .min(8)
    .required()

})

export default loginValidator