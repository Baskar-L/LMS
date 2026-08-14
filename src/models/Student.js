import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.index(
  {
    merchantId: 1,
    email: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Student", studentSchema);