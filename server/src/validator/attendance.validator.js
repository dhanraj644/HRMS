import Joi from "joi";


export const createAttendanceValidator = Joi.object({

    employee_id: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.empty": "Employee is required.",
            "any.required": "Employee is required.",
            "string.hex": "Invalid Employee ID.",
            "string.length": "Invalid Employee ID."
        }),

    date: Joi.date()
        .required()
        .messages({
            "date.base": "Invalid date.",
            "any.required": "Date is required."
        }),

    checkIn: Joi.date()
        .optional(),

    checkOut: Joi.date()
        .optional(),

    workingHours: Joi.number()
        .min(0)
        .optional(),

    overtimeHours: Joi.number()
        .min(0)
        .optional(),

    status: Joi.string()
        .valid(
            "Present",
            "Absent",
            "Half Day",
            "Leave",
            "Work From Home"
        )
        .optional()
        .messages({
            "any.only": "Invalid attendance status."
        }),

    remarks: Joi.string()
        .allow("")
        .optional()

});

export const updateAttendanceValidator = Joi.object({

    checkIn: Joi.date(),

    checkOut: Joi.date(),

    workingHours: Joi.number()
        .min(0),

    overtimeHours: Joi.number()
        .min(0),

    status: Joi.string()
        .valid(
            "Present",
            "Absent",
            "Half Day",
            "Leave",
            "Work From Home"
        ),

    remarks: Joi.string()
        .allow("")

})
.min(1)
.messages({
    "object.min": "At least one field is required."
});


export const attendanceIdValidator = Joi.object({

    id: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.hex": "Invalid Attendance ID.",
            "string.length": "Invalid Attendance ID.",
            "any.required": "Attendance ID is required."
        })

});