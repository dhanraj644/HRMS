import {Login,LogOut,refreshAccessToken} from "../controllers/auth.controller.js";
import { loginValidator} from "../validator/auth.validator.js";
import validate from "../middlewares/validation.middleware.js";
import auth from "../middlewares/auth.middleare.js"
import express from "express";

const authRouter = express.Router();


authRouter.post("/login",validate(loginValidator),Login);

authRouter.post("/logout",auth,LogOut);

authRouter.post("/refresh-token",refreshAccessToken);


export default authRouter;