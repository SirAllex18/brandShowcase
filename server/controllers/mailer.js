import nodemailer from "nodemailer";

export const newsletterEmail = async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "alexandru.nistor2@student.upt.ro",
      pass: process.env.PASSWORD,
    },
  });

  const mailSettings = {
    from: "alexandru.nistor2@student.upt.ro",
    to: email,
    subject: "Va multumim pentru ca v-ati abonat la newslatter-ul nostru!",
    text: "Aici va vom trimit oferte personalizate cu merch-ul nostru si noutati despre echipa noastra",
  };

  transporter.sendMail(mailSettings, (error, info) => {
    if (error) {
      res.status(500).send("Error sending email");
    } else {
      res.status(200).send("Subscription succesful");
    }
  });
};
