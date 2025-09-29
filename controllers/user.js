import userModel from "../models/user.js";

export async function HandleGetUserInfo(req, res) {
  const email = req.user.email;

  try {
    const userrecord = await userModel
      .findOne({ email: email })
      .select("-password");

    if (!userrecord) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: userrecord,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Try again later",
    });
  }
}

export async function HandleDeleteUserAcc(req, res) {
  const email = req.user.email;

  try {
    const userrecord = await userModel.findOne({ email: email })

    if (!userrecord) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    await userModel.deleteOne({email: email})

    return res.status(200).json({
      success: true,
      msg: "Acc deleted"
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Try again later",
    });
  }
  z;
}
