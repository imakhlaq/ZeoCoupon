"use server";

import connectToMongo from "@/lib/db";
import { User } from "@/model/users";

export async function signinUser(formData: FormData) {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!email || !username || password.trim().length < 6) {
    throw new Error("Credentials are not valid");
  }

  await connectToMongo();

  //email already exits
  const isUserExits = await User.findOne({ email });
  if (isUserExits) throw new Error("Email is already registered");

  const isUsernameTaken = await User.findOne({ username });
  if (isUsernameTaken) throw new Error("Email is already registered");
}
