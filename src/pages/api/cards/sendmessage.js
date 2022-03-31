import { hashPassword } from "../../../lib/auth/auth";
import dbConnect from "../../../lib/dbConnect";
import Token from "../../../models/Token";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    const { data, card_id } = req.body;
    const { email, message, name } = data;

    const nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.hostinger.com",
      secure: true,
      auth: {
        user: "no-reply@viadigitalcard.com",
        pass: "VIATech.D@123",
      },
    });

    const user = await User.findOne({
      _id: card_id,
    }).exec();

    const toSendemail = user.email;

    const mailOptions = {
      from: "no-reply@viadigitalcard.com",
      to: toSendemail,
      subject: "New Message Received",
      text: "You have received a new message from " + name + ".",
      html: `<span style="font-size: 15px; font-family: Calibri, Helvetica, Arial, Sans-Serif">
      <br />
      Hey ${email},<br />
      <br />You have received a new message on you Via Digital
      Card. Details are as follows:
      <br /><br />

        <b>Name : ${name} </b><br/><br/>

        <b>Email : ${email} </b><br/><br/>

        <b>Message : ${message} </b><br/><br/>

      Thanks &
      Regards,<br /><a href="https://viadigitalcard.in">Via Digital Card Team</a><br />
      (<a href="https://viacreativetech.com">Via Creative Tech LLP</a>)
    </span>
    <br />
    <img src="cid:logo@1" />

    <br />
    Shop-5, Poonam Park View, Global
    City, Virar, Maharashtra, India-401303
    `,
      attachments: [
        {
          filename: "logo.png",
          path: "./public/assets/images/logo.png",
          cid: "logo@1", //same cid value as in the html img src
        },
      ],
    };

    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.log("verifyyyyyyyyy", error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).json({ error: error.message });
          console.log("this is error", error);
          reject(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(201).json({ message: "Email sent" });
          resolve(info);
        }
      });
    });
  }
}
