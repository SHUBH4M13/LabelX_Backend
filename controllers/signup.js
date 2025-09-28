import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import VerifyEmail from "../controllers/OTP.js";
import Jwt from "jsonwebtoken";

async function HandleCreateAcc(req, res) {
  const { firstName, lastName, email, password, allergy, disease } = req.body;

  try {
    if (!firstName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Required field are missing",
      });
    }

    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    VerifyEmail(email);

    const newUser = await userModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedpassword,
      allergy: allergy,
      disease: disease,
    });

    return res.status(201).json({
      success: true,
      message: "account created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create account",
    });
  }
}

async function HandleLogin(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: "False",
        msg: "Required fields are missing",
      });
    }

    const userrecord = await userModel.findOne({ email: email });

    if (!emailrecord) {
      return res.status(404).json({
        success: "False",
        msg: "Account not found",
      });
    }

    const isMatch = bcrypt.compare(password, userrecord.password);

    if (!isMatch) {
      return res.status(401).json({
        success: "False",
        msg: "Wrong Password",
      });
    }

    const token = Jwt.sign({ _id: userrecord.id }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      success: "true",
      msg: "logged in",
      token
    });
    
  } catch (error) {
    return res.status(500).json({
      success: "False",
      msg: "Failed to login",
    });
  }
}

export default { HandleCreateAcc, HandleLogin };
