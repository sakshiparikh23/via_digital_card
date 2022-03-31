import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  companyName: {
    type: String,
  },
  country: {
    type: String,
  },
  message: {
    type: String,
  },
});

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema, "contact");
