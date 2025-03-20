const nodemailer = require("nodemailer");
const sendEmail = (email, subject, html) => {
  const emailId = email.join(" ,");
  //   console.log(email);
  //   console.log(subject);
  //   console.log(html);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gunjankotadiya5455@gmail.com",
      pass: "srfiigkamuyhreib",
    },
  });
  let mailDetails = {
    from: "gunjankotadiy5455@gmail.com",
    to: emailId,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log("Unable to send email", err);
    } else {
      console.log(`Email sent sucessfully to: ${emailId}`);
    }
  });
};
module.exports = sendEmail;
// srfi igka muyh reib
