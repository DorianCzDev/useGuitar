import "server-only";

import mongoose from "mongoose";
import "@/app/_models/User";

const TokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Token || mongoose.model("Token", TokenSchema);
