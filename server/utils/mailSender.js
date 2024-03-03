// const { exist } = require("joi");
// const nodemailer = require("nodemailer");
// require("dotenv").config();
import nodemailer from "nodemailer";

const mailSender = async (email, subject, body) => {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = transporter.sendMail({
      from: '"Studymates " studymates123456@gmail.com',
      to: `${email}`,
      subject: `${subject}`,
      html: `${body}`,
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log(error);
    exist(1);
  }
};

export default mailSender;
