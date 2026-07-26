import Joi from "joi";

export const objectIdValidator = Joi.object({

    id: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.empty": "ID is required.",
            "any.required": "ID is required.",
            "string.hex": "Invalid ID format.",
            "string.length": "Invalid ID."
        })

});