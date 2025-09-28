import express from "express";
import { HandleCreateAcc, HandleLogin } from "../controllers/signup.js";
import {validateOtp } from "../controllers/OTP.js"

const userRouter = express.Router();

userRouter.route("/signup").post(HandleCreateAcc);
userRouter.route("/otp").post(validateOtp);
userRouter.route("/login").post(HandleLogin);

export default userRouter;
