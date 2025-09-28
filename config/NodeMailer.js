import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.NodeMailer_Mail,
    pass: process.env.NodeMailer_Pass,
  },
});


export default transport