import nodemailer from "nodemailer";

const mail = (token,email) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "balaworkcc@gmail.com",
      pass: "niah mtpx rfrj sklb",
    },
  });

  let details = {
    from: "balaworkcc@gmail.com",
    to: `${email}`,
    subject: "Password-Reset",
    text: `Click the following link to reset your password: https://cosmic-nougat-7d04d1.netlify.app/reset-pass?token=${token}`,
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log("mail not send");
    } else {
      console.log("mail sent successfully");
    }
  });
};

export default mail;