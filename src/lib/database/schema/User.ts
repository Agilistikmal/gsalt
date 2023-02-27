import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    balance: {
      type: Number,
      required: true,
      default: 0.0,
    },
    updated_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { collection: "user" }
);

export const UserModel = model("user", UserSchema);
