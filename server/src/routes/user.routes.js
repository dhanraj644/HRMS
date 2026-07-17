import {create,getAllUser,getUserById,updateUser,updateUserStatus,updatePassword,deleteUserById} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleare.js"
import express from 'express'
import {userCreateValidator , updateUserValidator,updateStatusValidator,updateUserPasswordValidator} from '../validator/user.validator.js'
import validate from "../middlewares/validation.middleware.js";
const userRouter = express.Router()

userRouter.post('/',validate(userCreateValidator),create);

userRouter.get('/', getAllUser);

userRouter.get('/:id',auth, getUserById);

userRouter.put('/:id',auth,validate(updateUserValidator), updateUser);

userRouter.patch('/:id/status',validate(updateStatusValidator),updateUserStatus)

userRouter.patch('/:id/password',validate(updateUserPasswordValidator),updatePassword)

userRouter.delete("/:id/delete",deleteUserById)

export default userRouter