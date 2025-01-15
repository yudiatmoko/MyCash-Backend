import nodemailer from "nodemailer";
import mailerConfig from "./mailer.js";

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport(mailerConfig);
  return transporter.sendMail({
    from: '"MyCash Admin" <admin@mycash.com>',
    to,
    subject,
    html,
  });
};

export default sendEmail;
