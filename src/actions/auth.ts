"use server";

import { signIn } from "@/auth";
import { signOut } from "next-auth/react";

export async function handleGoogleSignIn() {
  try {
    await signIn("google", { redirectTo: "/" });
  } catch (error) {
    throw error;
  }
}

export async function handleGithubSignIn() {
  try {
    await signIn("github", { redirectTo: "/" });
  } catch (error) {
    throw error;
  }
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
