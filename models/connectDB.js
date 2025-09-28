import mongoose from "mongoose";

async function connectDB(url){
    await mongoose.connect(url)
    .then( () => {
        console.log("Database Connected")
    })
    .catch( (err) => {
        console.log("Database Error" , err)
    })
}

export default connectDB