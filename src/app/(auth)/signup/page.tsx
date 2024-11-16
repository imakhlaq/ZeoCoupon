import { signinUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SocalLogin from "../social/socallogin";

export default async function SignupPage() {
  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center gap-5  max-w-md  mx-auto rounded-sm md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black container">
      <h2>Welcome To ZeoCoupon</h2>

      <form action={signinUser} className="flex flex-col gap-5">
        <Label htmlFor="email">
          Email
          <Input id="email" type="email" name="email"></Input>
        </Label>
        <Label htmlFor="username">
          Username
          <Input
            id="username"
            placeholder="imakhlaq"
            type="text"
            name="username"
          ></Input>
        </Label>
        <Label htmlFor="password">
          Password
          <Input id="password" type="password" name="password"></Input>
        </Label>
        <Button type="submit">Submit</Button>
      </form>
      <p>
        Already have an account? <Link href={"/login"}>Login</Link>
      </p>
      <SocalLogin />
    </div>
  );
}
