import mongoose from "mongoose";

const InsightsSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  instagram: {
    type: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  twitter: {
    type: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  linkedin: {
    type: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  facebook: {
    type: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  website: {
    type: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  location: {
    type: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  vcf: {
    type: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  document: {
    type: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  google: {
    type: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  email: {
    type: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  payment: {
    type: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

export default mongoose.models.Insights ||
  mongoose.model("Insights", InsightsSchema, "insights");
