import nodemailer from "nodemailer";
require("dotenv").config();
const env = process.env;
export const sendMail = async () => {
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
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: ' <a href="www.google.com">Click here</a>', // html body
    });
  } catch (e) {
    console.log(e);
  }
};
