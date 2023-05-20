import nodemailer from "nodemailer";
require("dotenv").config();
const env = process.env;
export const sendMail = async (email, html) => {
  var transport = nodemailer.createTransport({
    //@ts-ignore
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASS,
    },
  });
  // send mail with defined transport object
  try {
    await transport.sendMail({
      from: '"lms 👻" <lms@example.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "User Invitation", // Subject line
      text: "Sign up to Library?", // plain text body
      html: html, // html body
    });
  } catch (e) {
    console.log(e);
  }
};
