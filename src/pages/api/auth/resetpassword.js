import { hashPassword } from "../../../lib/auth/auth";
import dbConnect from "../../../lib/dbConnect";
import Token from "../../../models/Token";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    const { email } = req.body;
    console.log(email);
    const nodemailer = require("nodemailer");
    // var smtpConfig = {};

    var transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.hostinger.com",
      secure: true,
      auth: {
        user: "no-reply@viadigitalcard.com",
        pass: "VIATech.D@123",
      },
    });
    let buffer = new Buffer(email);
    let baseData = buffer.toString("base64");
    let origin = `${process.env.NEXTAUTH_URL}/forget-password/${baseData}`;

    const existingUser = await User.findOne({
      email: email.trim(),
    }).exec();
    console.log(existingUser);
    if (!existingUser) {
      res.status(400).json({ message: " User does not exist " });
      return;
    }

    const existingToekn = await Token.findOne({
      userId: existingUser._id,
    }).exec();

    if (!existingToekn) {
      const uploadToken = await Token.create({
        _id: baseData,
        creatorId: existingUser._id,
      });
    } else {
      return res
        .status(402)
        .json({ message: "We have already sent you an email." });
    }
    const mailOptions = {
      from: "no-reply@viadigitalcard.com",
      to: email,
      subject: "Reset Password",
      text: "Click on the link to reset your password",
      html: `<span style="font-size: 15px; font-family: Calibri, Helvetica, Arial, Sans-Serif">
      <br />
      Hey ${email},<br />
      <br />You have received a new message on you Via Digital
      Card. Details are as follows:
      <br /><br />
        <b>Click below to Reset your password!</b><br/><br/>
        
        <a href="${origin}" target="_blank">
      <button style="width:120px; height:40px; background-color:#77C208;color:white;font-weight:bold;border-radius:5px;border:none">
      Reset Password
      </button></a><br /><br />
    
      
      
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
      // html: `<a href="${origin}" target="_blank">Click</a>`,
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

  if (method === "PUT") {
    const { password } = req.body;
    const { token } = req.body;

    console.log(password, token);
    const tokenData = await Token.findById(token).exec();
    if (!tokenData) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    const deleteToken = await Token.findByIdAndDelete(token).exec();

    if (!deleteToken) {
      res.status(401).json({ message: "ERROR" });
    }
    const hashedPassword = await hashPassword(password);

    const updateUser = await User.findByIdAndUpdate(
      tokenData.creatorId,
      { password: hashedPassword },
      { new: true }
    ).exec();
    if (!updateUser) {
      res.status(400).json({ message: "Error" });
    }
    res.status(200).json({ message: "Password updated" });
  }
}
