import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.NodeMailer_Mail,
    pass: process.env.NodeMailer_Pass,
  },
});

