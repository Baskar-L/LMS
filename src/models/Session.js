import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },

    shop: {
      type: String,
      required: true,
    },

    accessToken: {
      type: String,
      required: true,
    },

    scope: {
      type: String,
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Session", sessionSchema);