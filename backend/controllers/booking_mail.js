import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
  debug: true,
  logger: true,
});
const sendMail = async function ({ to, subject, text, html }) {
  console.log(transporter);
  let info = await transporter.sendMail({
    from: '"Trip-Trekker" <ankandevelopment@gmail.com>', 
    to,
    subject,
    text,
    html,
  });
  return info;
};
export default sendMail;