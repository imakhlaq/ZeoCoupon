import { auth } from "@/auth";

export async function getAuth() {
  const session = await auth();
  return session;
}
