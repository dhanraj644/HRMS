import Joi from "joi";

export const createDepartmentValidator = Joi.object({
  departmentName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Department Name cannot be empty",
      "string.min": "Department Name must be at least 2 characters",
      "string.max": "Department Name cannot exceed 100 characters",
      "any.required": "Department Name is required",
    }),

  departmentCode: Joi.string()
    .trim()
    .uppercase()
    .min(2)
    .max(10)
    .required()
    .messages({
      "string.empty": "Department Code cannot be empty",
      "string.min": "Department Code must be at least 2 characters",
      "string.max": "Department Code cannot exceed 10 characters",
      "any.required": "Department Code is required",
    }),

  description: Joi.string()
    .trim()
    .allow("")
    .optional(),

  status: Joi.string()
    .valid("Active", "Inactive")
    .default("Active")
    .messages({
      "any.only": "Status must be Active or Inactive",
    }),
});

export const updateDepartmentValidator = Joi.object({
  departmentName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .messages({
      "string.empty": "Department Name cannot be empty",
      "string.min": "Department Name must be at least 2 characters",
      "string.max": "Department Name cannot exceed 100 characters",
    }),

  departmentCode: Joi.string()
    .trim()
    .uppercase()
    .min(2)
    .max(10)
    .messages({
      "string.empty": "Department Code cannot be empty",
      "string.min": "Department Code must be at least 2 characters",
      "string.max": "Department Code cannot exceed 10 characters",
    }),

  description: Joi.string()
    .trim()
    .allow(""),

  status: Joi.string()
    .valid("Active", "Inactive")
    .messages({
      "any.only": "Status must be Active or Inactive",
    }),
})
.min(1)
.messages({
  "object.min": "At least one field is required to update.",
});