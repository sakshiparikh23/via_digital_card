import { hashPassword } from "../../../lib/auth/auth";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Token from "../../../models/Token";

export default async function Signup(req, res) {
  const { firstName, lastName, email, password } = req.body;

  const { method } = req;
  if (method === "POST") {
    //Error handling on allready exist or create g state to handle error
    await dbConnect();
    try {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
      }).exec();

      console.log(existingUser);
      if (existingUser) {
        res.status(422).json({ error: "User already exists" });
        return;
      }
      const nodemailer = require("nodemailer");
      const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.hostinger.com",
        secure: true,
        auth: {
          user: "no-reply@viadigitalcard.com",
          pass: "VIATech.D@123",
        },
      });
      let buffer = new Buffer(req.body.email);
      let baseData = buffer.toString("base64");
      let origin = `${process.env.NEXTAUTH_URL}/verify-email/${baseData}`;

      const mailOptions = {
        from: "no-reply@viadigitalcard.com",
        to: email,
        subject: "Verify your email",
        text: "Click on the link to verify your email",
        html: `<span style="font-size: 15px; font-family: Calibri, Helvetica, Arial, Sans-Serif">
        <br />
        Hey ${email},<br />
        <br />You have received a new message on you Via Digital
        Card. Details are as follows:
        <br /><br />
          <b>Thank you for registering, Please Verify your Account! </b><br/><br/>
          
          <a href="${origin}" target="_blank">
        <button style="width:120px; height:40px; background-color:#77C208;color:white;font-weight:bold;border-radius:5px;border:none">
        Verify Email
        </button></a><br /><br />
      
        
        
        Thanks &
        Regards,<br /><a href="https://viadigitalcard.in">Via Digital Card Team</a><br />
        (<a href="https://viacreativetech.com">Via Creative Tech LLP</a>)
      </span>
      <br />
      <img src="cid:logo@1" />
      
      <br />
      Shop-5, Poonam Park View, Global
      City, Virar, Maharashtra, India-401303`,
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

      const hashedPassword = await hashPassword(password);

      const result = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        premiumUser: false,
        verifyEmail: false,
        verifyToken: baseData,
      });

      res.status(201).json({ message: "Created user!" }, result);
    } catch (error) {
      res.status(500).json({ error: error.message });
      // res.status(500).json({ error: error.message });
    }
  }
}
