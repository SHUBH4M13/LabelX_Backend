import mongoose from "mongoose";
import userModel from "userModel.js"
import bcrypt from "bcrypt"

async function HandleCreateAcc(req,res){

    const { firstName  , lastName , email ,  password  , allergy  , disease } = req.body;

    try {

        if( !firstName || !email || !password ){
            return res.status(400)
            .json({
            success: false,
            message: "Required field are missing"
            })
        }

        const isUserExist = await userModel.findOne({email})

        if(isUserExist){
            return res.status(400)
            .json({
            success: false,
            message: "User already exist"
            })
        }

        const hashedpassword = await bcrypt.hash(password , 10)

        const newUser = await userModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedpassword,
            allergy: allergy,
            disease: disease
        })

        return res.status(201)
        .json({
            success: true,
            message: "account created"
        })


    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "Failed to create account"
        })
    }

}

export default HandleCreateAcc