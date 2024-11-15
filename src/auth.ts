import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectToMongo from "./lib/db";
import { User } from "./model/users";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      //"/api/auth/signin" this will show a form on this for username and pass auth
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      //and the info you will enter in above form will be passed her
      authorize: async (credentials) => {
        const email = credentials.username as string;
        const password = credentials.password as string;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email and password");
        }

        await connectToMongo();

        const user = await User.findOne({ email }).select("+password +role");
        if (!user) {
          throw new CredentialsSignin("Invalid email or password");
        }

        const isPasHashMatch = await compare(password, user.password);
        if (!isPasHashMatch) {
          throw new CredentialsSignin("Invalid email or password");
        }

        const userData = {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login", //here were are disbaling the nextauth default signin page("/api/auth/signin") and instead using our own.
  },
});
