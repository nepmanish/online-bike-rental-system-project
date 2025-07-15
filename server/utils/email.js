const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1)creratet a trasnporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //2)define the email options
  const mailOptions = {
    from: 'Nimesh Funjeli <mlljkk12@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html
  };

  //3)actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
