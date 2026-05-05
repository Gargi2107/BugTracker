const nodemailer = require("nodemailer");

const sendEmail = async (subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // app password
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, 
    subject,
    text,
  });
};

module.exports = sendEmail;