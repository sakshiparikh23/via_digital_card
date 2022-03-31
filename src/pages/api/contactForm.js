import Contact from "../../models/Contact";
import dbConnect from "../../lib/dbConnect";
export default async function Signup(req, res) {
  const { message, CompanyName, email, name } = req.body;

  const { method } = req;
  if (method === "POST") {
    //Error handling on allready exist or create g state to handle error
    await dbConnect();

    try {
      const result = await Contact.create({
        name: name,
        email: email,
        companyName: CompanyName,
        message: message,
      });

      res.status(200).json({ message: "Created user!" }, result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
