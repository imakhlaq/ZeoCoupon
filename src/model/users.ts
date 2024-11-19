import mongoose from "mongoose";
import { date } from "zod";

const usersSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, select: false },
  role: { type: String, default: "user" },
  image: { type: String },

  //from google or github
  authProviderId: { type: String },
});
console.log(date);

export const User =
  mongoose.models?.User || mongoose.model("User", usersSchema);
