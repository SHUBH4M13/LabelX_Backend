import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    ingredientName: {
        type: String,
        required: true,
    },
    ingredientType: {
        type: String,
    },
    sideEffects:{
        type: String,
    },
    bannedIn:{
        type: [String],
    }
})

const ingredientModel = mongoose.model("ingredientModel" , ingredientSchema)

export default ingredientModel