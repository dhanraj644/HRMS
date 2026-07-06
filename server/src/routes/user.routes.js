import {create,getAllUser,getUserById,updateUser} from "../controllers/user.controller.js";
import express from 'express'
import userCreateValidator from '../validator/user.validator.js'
import validate from "../middlewares/validation.middleware.js";
const userRouter = express.Router()

userRouter.post('/',validate(userCreateValidator),create);

userRouter.get('/', getAllUser);

userRouter.get('/:id', getUserById);

userRouter.put('/:id',validate(userCreateValidator), updateUser)


export default userRouter