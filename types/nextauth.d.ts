/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;
type Role = string;
type Username = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: string;
    username: string;
  }
}
declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: Role;
      username: Username;
    };
  }
}

declare module "next-auth" {
  interface User {
    id: UserId;
    role: Role;
    username: Username;
  }
}
