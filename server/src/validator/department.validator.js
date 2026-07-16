import joi from "joi";

export const createDepartmentValidator = joi.object({
  departmentName: joi.string()
    .required()
    .messages({
      "string.empty": "Department Name cannot be empty",
      "any.required": "Department Name is required",
    }),

  departmentCode: joi.string()
    .required()
    .messages({
      "string.empty": "Department Code cannot be empty",
      "any.required": "Department Code is required",
    }),

  description: joi.string()
    .required()
    .messages({
      "string.empty": "Description cannot be empty",
      "any.required": "Description is required",
    }),

  status: joi.string()
    .valid("Active", "Inactive")
    .required()
    .messages({
      "string.empty": "Status cannot be empty",
      "any.required": "Status is required",
      "any.only": "Status must be Active or Inactive",
    }),
});

export const updateDepartmentValidator = joi.object({
  departmentName: joi.string().messages({
    "string.empty": "Department Name cannot be empty",
  }),

  departmentCode: joi.string().messages({
    "string.empty": "Department Code cannot be empty",
  }),

  description: joi.string().messages({
    "string.empty": "Description cannot be empty",
  }),

  status: joi.string()
    .valid("Active", "Inactive")
    .messages({
      "string.empty": "Status cannot be empty",
      "any.only": "Status must be Active or Inactive",
    }),
});