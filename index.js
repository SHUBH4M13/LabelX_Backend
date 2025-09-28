import express from "express"
import http from "http"
import connectDB from "./models/connectDB.js";
import userRouter from "./routes/user.js"
import dotenv from "dotenv"
dotenv.config()

const PORT = 8005
const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

connectDB(`mongodb://127.0.0.1:27017/LabelX`)

app.get( '/health' , (req,res) => {
    res.json({message: "Server is working"})
})

app.use("/" , userRouter)



server.listen( PORT , () => {
    console.log(`Server has been started: http://localhost:${PORT}`)
})