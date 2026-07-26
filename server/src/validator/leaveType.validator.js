import Joi from "joi";


export const createLeaveTypeValidator = Joi.object({

    leaveName: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Leave Name cannot be empty.",
            "any.required": "Leave Name is required."
        }),

    totalDays: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "Total Days must be a number.",
            "number.integer": "Total Days must be an integer.",
            "number.min": "Total Days must be at least 1.",
            "any.required": "Total Days is required."
        }),

    description: Joi.string()
        .trim()
        .allow("")
        .optional(),

    status: Joi.string()
        .valid("Active", "Inactive")
        .required()
        .messages({
            "string.empty": "Status cannot be empty.",
            "any.required": "Status is required.",
            "any.only": "Status must be Active or Inactive."
        })

});


export const updateLeaveTypeValidator = Joi.object({

    leaveName: Joi.string()
        .trim()
        .messages({
            "string.empty": "Leave Name cannot be empty."
        }),

    totalDays: Joi.number()
        .integer()
        .min(1)
        .messages({
            "number.base": "Total Days must be a number.",
            "number.integer": "Total Days must be an integer.",
            "number.min": "Total Days must be at least 1."
        }),

    description: Joi.string()
        .trim()
        .allow(""),

    status: Joi.string()
        .valid("Active", "Inactive")
        .messages({
            "any.only": "Status must be Active or Inactive."
        })

})
.min(1)
.messages({
    "object.min": "At least one field is required."
});
