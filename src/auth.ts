import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectToMongo from "./lib/db";
import { User } from "./model/users";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { log } from "console";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    //for username and pass
    Credentials({
      name: "credentials",
      //"/api/auth/signin" this will show a form on this for username and pass auth
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      //and the info you will enter in above form will be passed her
      //for successfull login using username and pass return loged in user object else return false(null, undefined)
      authorize: async (credentials) => {
        const email = credentials.username as string;
        const password = credentials.password as string;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email and password");
        }

        await connectToMongo();

        //checking and validating user credentials
        const userDB = await User.findOne({ email }).select("+password +role");
        if (!userDB) {
          throw new Error("Invalid email or password");
        }

        const isPasHashMatch = await compare(password, userDB.password);
        if (!isPasHashMatch) {
          throw new Error("Invalid email or password");
        }

        //You have to retun user object
        const user = {
          id: userDB._id,
          email: userDB.email,
          username: userDB.username,
          role: userDB.role,
        };

        return user; //anthing you returned will be store in cookie on clinet
        //This returned user object will be pass down to the callbacks (Jwt)
      },
    }),
  ],
  pages: {
    //here were are disbaling the nextauth default signin page("/api/auth/signin") and instead using our own.
    signIn: "/login",
  },

  callbacks: {
    //adding extra more claims to the jwt token
    //return object will be treated as a token that contains every data needed to be injected in jwt
    //-----------------| this user object is returned by providers from above (google, github and credentials authorize function)
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },

    //modifing the session object(adding more things that client can access when const session=auth())
    //return object will be treated as session (const session=auth())
    //-------------------------| this token object is returned by the above jwt callback
    async session({ session, token }) {
      if (token.sub && token.role) {
        session.user.id = token.sub;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },

    //this will be called when user try to sign in
    signIn: async function ({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;

          await connectToMongo();

          //we check if this google account has been used before to login
          const isUserExits = await User.findOne({ email });

          //it has not been used previously then we create a user record in DB
          if (!isUserExits) {
            await User.create({ email, name, image, authProviderId: id });
          } else {
            //else we return true to grant user access
            return true;
          }
        } catch (error) {
          log(error);
          throw new Error(`"Error while creating user"`);
        }
      }

      //for username and pass
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }

      //for github
    },
  },
});
