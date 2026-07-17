import Joi from "joi";

export const userCreateValidator = Joi.object({

  userName: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "Username cannot be empty",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username cannot exceed 30 characters",
      "any.required": "Username is required",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Please enter a valid email",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .max(50)
    .required()
    .messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 50 characters",
      "any.required": "Password is required",
    }),

  role_id: Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      "string.length": "Invalid Role ID",
      "string.hex": "Invalid Role ID",
      "any.required": "Role is required",
    }),

});


export const updateUserValidator = Joi.object({

  userName: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .messages({
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username cannot exceed 30 characters",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .messages({
      "string.email": "Please enter a valid email",
    }),

  password: Joi.string()
    .min(8)
    .max(50)
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 50 characters",
    }),

  role_id: Joi.string()
    .length(24)
    .hex()
    .messages({
      "string.length": "Invalid Role ID",
      "string.hex": "Invalid Role ID",
    }),

  is_active: Joi.string()
    .valid("Active", "Inactive")
    .messages({
      "any.only": "Status must be Active or Inactive",
    }),

})
.min(1)
.messages({
  "object.min": "At least one field is required to update.",
});


export const updateStatusValidator = Joi.object({

  is_active: Joi.string()
    .valid("Active", "Inactive")
    .required()
    .messages({
      "string.empty": "Status cannot be empty",
      "any.required": "Status is required",
      "any.only": "Status must be Active or Inactive",
    }),

});

export const updateUserPasswordValidator = Joi.object({

  currentPassword: Joi.string()
    .required()
    .messages({
      "string.empty": "Current Password cannot be empty",
      "any.required": "Current Password is required",
    }),

  newPassword: Joi.string()
    .min(8)
    .max(50)
    .required()
    .messages({
      "string.empty": "New Password cannot be empty",
      "string.min": "New Password must be at least 8 characters",
      "string.max": "New Password cannot exceed 50 characters",
      "any.required": "New Password is required",
    }),

});