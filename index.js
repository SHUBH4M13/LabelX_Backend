import express from "express"
import http from "http"
import connectDB from "./models/connectDB.js";

const PORT = 8005
const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

connectDB(`mongodb://127.0.0.1:27017/LabelX`)

app.get( '/health' , (req,res) => {
    res.json({message: "Server is working"})
})

server.listen( PORT , () => {
    console.log(`Server has been started: http://localhost:${PORT}`)
})