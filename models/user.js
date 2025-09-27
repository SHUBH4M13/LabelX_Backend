import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    allergy: {
        type: [String],
        default: [],
        enum: ["Peanuts" , "Nuts" , "Soy" , "Wheat" , "Lactose" , "Eggs" , "Tree Nuts"]
    },
    disease: {
        type: [String],
        default: [],
        enum: ["Heart Problems" , "Kidney Problems"]
    }
} , {timestamps: true})

const userModel = mongoose.model("userModel" , userSchema );

export default userModel