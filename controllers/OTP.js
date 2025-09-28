import transport from "../config/NodeMailer.js";
import bcrypt from "bcrypt";
import otpmodel from "../models/OTP.js";
import userModel from "../models/user.js";

import dotenv from "dotenv";
dotenv.config();

function GenerateCode() {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  return otp;
}

export async function sendotpMail(email) {
  const OTPCode = GenerateCode();
  const hashedotp = await bcrypt.hash(OTPCode, 10);

  const info = await transport.sendMail(
    {
      from: process.env.NodeMailer_Mail,
      to: email,
      subject: `Here is your OTP`,
      text: `Your OTP is ${OTPCode}`,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    }
  );

  try {
    await otpmodel.create({
      email: email,
      otp: hashedotp,
      createdAt: Date.now(),
      expireAt: new Date(Date.now() + 15 * 60 * 1000),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function validateOtp(req, res) {
  const { email, otp } = req.body;
  const otprecord = await otpmodel.findOne({ email });

  try {
    if (!otp || !otprecord) {
      return res.status(400).json({
        success: false,
        msg: "OTP Missing Please Generate new otp",
      });
    }

    if (otprecord.expireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        msg: "OTP Expired Generate new otp",
      });
    }

    const isSame = bcrypt.compare(otp, otprecord.otp);

    if (!isSame) {
      return res.status(400).json({
        success: false,
        msg: "enter valid otp ",
      });
    }

    await otpmodel.deleteMany({ email: email });
    await userModel.updateOne({ email: email }, { isVerified: true });

    return res.status(200).json({
      success: true,
      msg: "OTP verfication successfull",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Falied to validate OTP",
    });
  }
}
