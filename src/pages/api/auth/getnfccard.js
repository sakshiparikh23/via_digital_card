import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
const razorpay = require("razorpay");

const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
export default async function getUser(req, res) {
  const { card_id } = req.body;
  console.log(card_id);
  await dbConnect();
  try {
    const response = await User.findOne({
      _id: card_id,
    });

    if (response) {
      const data = JSON.parse(JSON.stringify(response));

      const isNFC_Card_Selected = data.isNFC_Card_Selected;
      console.log(isNFC_Card_Selected);
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
              const data = {
                ...order,
                isNFC_Card_Selected,
              };

              return res.status(200).json(data, { message: "User is NFC" });
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

    // if (premiumUser) {
    //   res.status(200).json({ message: "User is premium" });
    //   return;
    // }
    // if (!premiumUser) {
    //   res.status(400).json({ message: "User is not premium" });
    //   return;
    // }
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}
