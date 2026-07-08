import {create,getAllUser,getUserById,updateUser,updateUserStatus} from "../controllers/user.controller.js";
import express from 'express'
import {userCreateValidator , updateUserValidator,updateStatusValidator} from '../validator/user.validator.js'
import validate from "../middlewares/validation.middleware.js";
const userRouter = express.Router()

userRouter.post('/',validate(userCreateValidator),create);

userRouter.get('/', getAllUser);

userRouter.get('/:id', getUserById);

userRouter.put('/:id',validate(updateUserValidator), updateUser);

userRouter.patch('/:id/status',validate(updateStatusValidator),updateUserStatus)


export default userRouter