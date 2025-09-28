import mongoose from "mongoose";

const OTPScehma = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    }, 
    otp:{
        type: String,
        required: true,
    }, 
    createdAt: {
        type: Date,
    },
    expireAt: {
        type: Date,
    }
} , {timestamps: true})

const otpmodel = mongoose.model("otpmodel" , OTPScehma)

export default otpmodel