import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function verifyEmail(req, res) {
  const { method } = req;
  if (method === "PUT") {
    //Error handling on allready exist or create g state to handle error
    await dbConnect();

    try {
      const { token } = req.body;

      const updateUserWithToken = await User.findOne({
        verifyToken: token,
      });
      if (!updateUserWithToken) {
        res.status(400).json({ error: "Invalid token" });
        return;
      }
      const updateUser = await User.findOneAndUpdate(
        {
          verifyToken: token,
        },
        {
          $set: {
            verifyEmail: true,
            verifyToken: null,
          },
        },
        {
          new: true,
        }
      );

      if (updateUser) {
        res.status(200).json({ message: "Email verified!" });
      } else {
        res.status(400).json({ error: "Invalid token" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
