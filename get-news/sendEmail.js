const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
var transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    user: "godelicia2007@gmail.com",
    pass: "193N1001t4W_@niconal-2007",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

var mailOptions = {
  from: process.env.USER,
  to: "nicolasteofilodecastro@gmail.com",
  subject: "",
  text: "",
};

function sendMail(subject, text, link, url) {
  mailOptions.subject = subject;
  mailOptions.html = "<a href=" + url + link + ">" + text + "</a>";
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
}

module.exports = sendMail;
