import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },

    shortId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      default: "",
    },

    clicks: {
      type: Number,
      default: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },

    expiresAt: {
      type: Date,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Link ||
mongoose.model("Link", linkSchema);