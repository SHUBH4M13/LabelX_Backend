import express from "express"
import http from "http"

const PORT = 8005
const app = express();

const server = http.createServer(app);

app.get( '/health' , (req,res) => {
    res.json({message: "Server is working"})
})

server.listen( PORT , () => {
    console.log(`Server has been started: http://localhost:${PORT}`)
})