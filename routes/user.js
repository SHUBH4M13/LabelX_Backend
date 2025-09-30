import express from "express";
import { HandleCreateAcc, HandleLogin } from "../controllers/signup.js";
import { validateOtp } from "../controllers/OTP.js";
import { HandleGetUserInfo, HandleDeleteUserAcc } from "../controllers/user.js";
import authenticateJWT from "../middleware/auth.js";
import UploadMiddleware from "../middleware/UploadMiddleware.js";
import HandleImageToText from "middleware/tesseract.js";

const userRouter = express.Router();

userRouter.route("/signup").post(HandleCreateAcc);
userRouter.route("/otp").post(validateOtp);
userRouter.route("/login").post(HandleLogin);

userRouter.route("/profile").get(HandleGetUserInfo).delete(HandleDeleteUserAcc);

userRouter
  .route("/upload")
  .post(UploadMiddleware, HandleImageToText, (req, res) => {
    res.json({
      file: req.file, // from UploadMiddleware
      ocrText: req.ocrText, // from HandleImageToText
    });
  });

export default userRouter;
