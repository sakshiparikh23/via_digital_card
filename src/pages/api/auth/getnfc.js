import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { getSession } from "next-auth/react";
const razorpay = require("razorpay");

const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default async function getUser(req, res) {
  const session = await getSession({ req });
  console.log(session);

  await dbConnect();
  try {
    const response = await User.findOne({
      email: session && session.user.email,
    });
    console.log("ressssss", response);
    if (response) {
      const data = JSON.parse(JSON.stringify(response));
      let subId = data?.NFC_paymentDetails?.subscription_id;

      if (subId == null) {
        return res
          .status(400)
          .json({ message: "No subscription ID found, User is not NFC" });
      }
      if (!subId) {
        return res
          .status(400)
          .json({ message: "No subscription ID found, User is not NFC" });
      }
      if (subId) {
        await instance.subscriptions.fetch(subId, (err, order) => {
          if (err) {
            console.log(err);
            return res.status(400).json({
              message: "Error Fetching Data of NFC User",
            });
          }
          if (order) {
            console.log(order.status);
            console.log(order);
            if (order.status === "active") {
              return res.status(200).json(order, { message: "User is NFC" });
            } else {
              return res
                .status(400)
                .json(order, { message: "User is not NFC" });
            }
          }
        });
      }
    }
    if (!response) {
      res.status(400).json({ error: "No user found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}
