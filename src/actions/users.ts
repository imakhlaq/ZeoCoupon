"use server";

import connectToMongo from "@/lib/db";
import { User } from "@/model/users";
import { log } from "console";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

/*
NOTE: You can call the server actions from inside a client components to just like server compoents.
*/

//creating user by email and pass
//You can also create an endpoint that can do this instead of server actions
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

  const hasedPass = await bcrypt.hash(password, 10);

  await User.create({ email, username, hasedPass });
  log("User created successfully");

  redirect("/login");
}

//because we are not using the nextAuth form instead we are using our login form
//we have to trigger next auth credentials authentication like this
export async function signInAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      username,
      password,
    });
  } catch (error) {
    //casting error to class that is returned by nextAuth
    const credentialError = error as CredentialsSignin;
    console.log(credentialError.cause);
  }
  redirect("/");
}
