import Joi from "joi";

const objectId = Joi.string().length(24).hex();

export const createEmployeeValidator = Joi.object({
  user_id: objectId.required(),
  department_id: objectId.required(),
  designation_id: objectId.required(),
  reportingManager: objectId.allow(null),

  firstName: Joi.string().trim().min(2).max(50).required(),
  lastName: Joi.string().trim().min(2).max(50).required(),

  email: Joi.string().trim().lowercase().email().required(),

  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required(),

  gender: Joi.string()
    .valid("Male", "Female", "Other")
    .required(),

  dob: Joi.date().required(),

  bloodGroup: Joi.string().valid(
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
  ),

  maritalStatus: Joi.string().valid(
    "Single",
    "Married",
    "Divorced",
    "Widowed"
  ),

  photo: Joi.string().allow("", null),

  joiningDate: Joi.date(),

  employeeType: Joi.string().valid(
    "Full-Time",
    "Part-Time",
    "Intern",
    "Contract",
    "Freelancer"
  ),

  status: Joi.string().valid(
    "Active",
    "Inactive",
    "On Leave",
    "Resigned",
    "Terminated"
  ),

  salary: Joi.number().min(0),

  address: Joi.object({
    current: Joi.object({
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      pincode: Joi.string()
        .pattern(/^\d{6}$/)
        .required(),
    }).required(),

    permanent: Joi.object({
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      pincode: Joi.string()
        .pattern(/^\d{6}$/)
        .required(),
    }).required(),
  }),

  emergencyContact: Joi.object({
    name: Joi.string().required(),
    relationship: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required(),
  }),

  bankDetails: Joi.object({
    bankName: Joi.string().required(),
    accountNumber: Joi.string().required(),
    ifsc: Joi.string()
      .pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)
      .required(),
    branch: Joi.string().required(),
  }),

  documents: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),

      type: Joi.string()
        .valid(
          "aadhaar",
          "pan",
          "resume",
          "passport",
          "driving-license",
          "marksheet",
          "offer-letter",
          "other"
        )
        .required(),

      url: Joi.string().required(),
    })
  ),
});

export const updateEmployeeValidator = createEmployeeValidator
  .fork(Object.keys(createEmployeeValidator.describe().keys), (schema) =>
    schema.optional()
  )
  .min(1)
  .messages({
    "object.min": "At least one field is required to update.",
  });

export const updateMyProfileValidator = Joi.object({
  phone: Joi.string().pattern(/^[6-9]\d{9}$/),

  photo: Joi.string().allow("", null),

  bloodGroup: Joi.string().valid(
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
  ),

  maritalStatus: Joi.string().valid(
    "Single",
    "Married",
    "Divorced",
    "Widowed"
  ),

  address: Joi.object(),

  emergencyContact: Joi.object(),

  bankDetails: Joi.object(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update.",
  });