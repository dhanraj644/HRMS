import joi from "joi"

export const createDesignationValidator = joi.object({

    designationName: joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Designation Name cannot be empty",
      "string.min": "Designation Name must be at least 2 characters",
      "string.max": "Designation Name cannot exceed 100 characters",
      "any.required": "Designation Name is required",
    }),

    department_id : joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      "string.length": "Invalid Department ID",
      "string.hex": "Invalid Department ID",
      "any.required": "Department is required",
    }),

    description : joi.string()
    .trim()
    .allow("")
    .optional(),

    status : joi.string()
    .valid("Active", "Inactive")
    .default("Active")
    .messages({
      "any.only": "Status must be Active or Inactive",
    }),
})


export const updateDesignationValidator = joi.object({

    designationName: joi.string()
    .trim()
    .min(2)
    .max(100),

    department_id : joi.string()
    .length(24)
    .hex(),

    description : joi.string()
      .trim()
    .allow(""),

    status : joi.string()
    .valid("Active", "Inactive"),
})
.min(1)
.messages({
  "object.min": "At least one field is required to update.",
});
