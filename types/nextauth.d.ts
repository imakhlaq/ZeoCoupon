/* type UserId = string;
type Role = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: Role;
  }
}
declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: Role;
    };
  }
}
 */
