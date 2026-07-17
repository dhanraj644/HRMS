import joi from "joi";


const loginValidator = joi.object({
    
    email : joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

    password: joi.string()
    .min(8)
    .max(50)
    .required()
    .messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 50 characters",
      "any.required": "Password is required",
    }),

})


export  {loginValidator}