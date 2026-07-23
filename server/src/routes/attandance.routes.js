import {checkIn,checkOut,getMyAttendance,createAttandance,
    getAttendances,getAttendancesById,updateAttandance,deleteAttandance}
     from "../controllers/attendance.controller.js"
import express from "express"

import auth from "../middlewares/auth.middleare.js";
import authtorize from "../middlewares/autherize.middleware.js"
import {createAttendanceValidator,updateAttendanceValidator,attendanceIdValidator} 
from "../validator/attendance.validator.js";
import validate from "../middlewares/validation.middleware.js";
const attandanceRouter = express.Router()


attandanceRouter.post("/",auth,authorize("Admin", "HR"),validate(createAttendanceValidator),createAttandance);

attandanceRouter.get("/",auth,authorize("Admin", "HR", "Manager"),getAttendances);

attandanceRouter.get("/:id",auth,authorize("Admin", "HR", "Manager"),validate(attendanceIdValidator),getAttendancesById);

attandanceRouter.patch("/:id",auth,authorize("Admin", "HR"),validate(updateAttendanceValidator),updateAttandance);

attandanceRouter.delete("/:id",auth,authorize("Admin"),deleteAttandance);

attandanceRouter.post("/check-in",auth,authorize("Employee"),checkIn);

attandanceRouter.patch("/check-out",auth,authorize("Employee"),checkOut);

attandanceRouter.get("/me",auth,authorize("Employee"),getMyAttendance);


export default attandanceRouter

