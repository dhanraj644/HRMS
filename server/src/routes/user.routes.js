import {create,getAllUser,getUserById,updateUser,updateUserStatus,updatePassword,deleteUserById} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleare.js"
import express from 'express'
import {userCreateValidator , updateUserValidator,updateStatusValidator,updateUserPasswordValidator} from '../validator/user.validator.js'
import {validate,validateParams}  from "../middlewares/validation.middleware.js";
import {objectIdValidator} from "../validator/common.validator.js"

const userRouter = express.Router()

userRouter.post('/',validate(userCreateValidator),create);

userRouter.get('/', getAllUser);

userRouter.get('/:id',auth,validateParams(objectIdValidator), getUserById);

userRouter.put('/:id',auth,validateParams(objectIdValidator),validate(updateUserValidator), updateUser);

userRouter.patch('/:id/status',validateParams(objectIdValidator),validate(updateStatusValidator),updateUserStatus)

userRouter.patch('/:id/password',validateParams(objectIdValidator),validate(updateUserPasswordValidator),updatePassword)

userRouter.delete("/:id/delete",validateParams(objectIdValidator),deleteUserById)

export default userRouter