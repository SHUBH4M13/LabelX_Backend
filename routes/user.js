import express from "express";
import { HandleCreateAcc, HandleLogin } from "../controllers/signup.js";
import {validateOtp } from "../controllers/OTP.js"
import { HandleGetUserInfo , HandleDeleteUserAcc } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.route("/signup").post(HandleCreateAcc);
userRouter.route("/otp").post(validateOtp);
userRouter.route("/login").post(HandleLogin);

userRouter.route("/profile")
.get(HandleGetUserInfo)
.delete(HandleDeleteUserAcc)



export default userRouter;
