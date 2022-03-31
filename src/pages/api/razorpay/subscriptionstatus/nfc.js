import { getSession } from "next-auth/react";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

const razorpay = require("razorpay");

const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
export default async function handler(req, res) {
  const session = await getSession({ req });
  const email = session && session.user.email;

  await dbConnect();
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      res.status(400).json({ error: "No user found" });
      return;
    }
    if (user) {
      const data = JSON.parse(JSON.stringify(user));
      console.log(data);
      let subId = data?.NFC_paymentDetails?.subscription_id;
      let cancelAtNextBillingNFC = data.cancelAtNextBillingNFC;
      console.log("Cancel at billing ", cancelAtNextBillingNFC);

      if (subId == null) {
        res.status(402).json({ message: "No NFC subscription found" });
        return;
      }
      if (data) {
        await instance.subscriptions.fetch(subId, (err, order) => {
          if (err) {
            console.log(err);
            return res.status(400).json({
              message: "No NFC subscription found",
            });
          }
          if (order) {
            console.log(order);
            const data = {
              ...order,
              cancelAtNextBillingNFC,
            };
            return res
              .status(200)
              .json(data, { message: "NFC subscription found" });
          }
        });
      } else {
        console.log(err);
        res.status(400).json({
          message: "No NFC subscription found",
        });
      }
    }
    // })
    // .catch((err) => {
    //   console.log(err);
    //   return res
    //     .status(401)
    //     .json({
    //       message: "No subscription found",
    //     })
    //     .end();
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
}
