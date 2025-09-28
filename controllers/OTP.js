import transport from "../config/NodeMailer";
import bcrypt from "bcrypt";
import otpmodel from "../models/OTP";
import userModel from "../models/user";

function GenerateCode() {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  const hashedotp = bcrypt.hash(otp, 10);
  return hashedotp;
}

async function verifyEmail(email) {
  const OTPCode = GenerateCode();

  transport.sendMail(
    {
      from: process.env.NodeMailer_Mail,
      to: email,
      subject: `Here is your OTP - `,
      text: OTPCode,
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
    const hashedotp = bcrypt.hash(otp, 10);

    await otpmodel.create({
      email: email,
      otp: hashedotp,
      createdAt: Date.now(),
      expireAt: Date.now() * 15 * 60 * 1000,
    });

    return res.status(201).json({ msg: "OTP send and created" });
  } catch (error) {
    return res.status(500).json({ msg: "Failed to save OTP" });
  }
}

async function validateOtp() {
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

    if(!isSame){
        return res.status(400).json({
            success: false,
            msg: "enter valid otp ",
          });
    }

    await otpmodel.deleteMany({email: email})
    await userModel.updateOne(
        {email: email} ,
        { isVerified: true }
    )

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

export default { verifyEmail , validateOtp};
