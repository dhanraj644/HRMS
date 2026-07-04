import { create } from "../controllers/user.controller.js";
import express from 'express'
import userCreateValidator from '../validator/user.validator.js'
import validate from "../middlewares/validation.middleware.js";
const userRouter = express.Router()

userRouter.post('/',validate(userCreateValidator),create);

export default userRouter