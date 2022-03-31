import Card from "../../../models/Card";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  const { isSelected, card_id, _id } = req.body;

  await dbConnect();

  if (method === "POST") {
    console.log(isSelected, card_id);

    const data = {
      isNFC_Card_Selected: {
        isSelected: true,
        card_id: _id,
      },
    };

    try {
      const user = await User.findByIdAndUpdate(card_id, data);
      if (!user) {
        return res.status(400).json({ message: "Does not find User" });
      }
      //   Card.schema.add({
      //     isNFC: { type: Boolean },
      //   });
      //   const data = {
      //     isNFC: true,
      //   };
      //   const card = await Card.findByIdAndUpdate(_id, data);
      //   if (!card) {
      //     return res.status(400).json({ message: "Does not find card" });
      //   }
      //   if (card) {
      //     return res.status(200).json({ message: "Card is selected" });
      //   }

      res.status(200).json({ message: "User is Updated" });
    } catch (error) {
      res.status(500).json({ message: "Error updating card" });
    }
  }
}
