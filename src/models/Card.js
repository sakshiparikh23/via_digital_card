import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  card_id: {
    type: String,
  },
  name: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  brochure: {
    type: String,
  },
  pnumber: {
    type: String,
  },
  snumber: {
    type: String,
  },
  address: {
    type: String,
  },
  designation: {
    type: String,
  },
  tagline: {
    type: String,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
  socialLinks: {
    type: Object,
    whatsapp: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    google: { type: String },
  },

  payment: {
    type: String,
  },
  views: {
    type: Number,
  },
  theme: {
    type: String,
  },
});

export default mongoose.models.Card ||
  mongoose.model("Card", CardSchema, "digicards");
