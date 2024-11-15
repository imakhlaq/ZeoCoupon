import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function SignupPage() {
  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-sm md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black">
      <h2>Welcome To ZeoCoupon</h2>

      <form>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="imakhlaq"
          type="text"
          name="username"
        ></Input>

        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email"></Input>

        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password"></Input>
      </form>
    </div>
  );
}
