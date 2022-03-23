const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //creating the transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //defining the email options
  const mailOptions = {
    from: "Jessica Oyakhilome <jessy@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //actually sending the mail

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
