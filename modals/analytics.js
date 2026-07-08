import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    linkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },

    ip: String,

    browser: String,

    os: String,

    device: String,

    country: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Analytics ||
  mongoose.model("Analytics", analyticsSchema);