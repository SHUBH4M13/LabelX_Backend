import ingredientModel from "../models/ingredient.js";
import HandleGetAIAdvice from "../config/GenAI.js"
import {HandleGetUserMedicalInfo} from "../controllers/user.js"

async function HandleGetResults(req,res){

    const ingredient = req.ocrText;

    try {

        const items = ingredient.split(", ")
        console.log("items: " , items)
        const data = await ingredientModel.find({ ingredientName: { $in: items } });
        console.log("data: " , data)

        const email = req.user.email
        console.log("email: " , email)

        const userdetail = await HandleGetUserMedicalInfo(email)
        console.log("userdetail: " , userdetail)

        const AIresponse = await HandleGetAIAdvice(items , userdetail ,data)
        console.log("AIresponse: " , AIresponse)

        return res.status(200)
        .json({
            ingredientInfo: data,
            AIresponse: AIresponse
        })


    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch ingredient information" , errmessage : error})
    }

}

export default HandleGetResults