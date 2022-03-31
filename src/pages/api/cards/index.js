import Card from "../../../models/Card";
import dbConnect from "../../../lib/dbConnect";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const session = await getSession({ req });
  const { method } = req;
  const data = req.body;
  const cardData = {
    card_id: session && session?.user?.id,
    ...data,
  };

  const { _id } = req.body;
  await dbConnect();

  switch (method) {
    case "PUT" /* Edit a model by its ID */:
      try {
        const card = await Card.findByIdAndUpdate(_id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!card) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: card });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const card = await Card.create(cardData);
        /* create a new model in the database */
        res.status(201).json({
          success: true,
          values: card,
          message: "Card created successfully",
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
