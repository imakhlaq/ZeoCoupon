import { signinUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SocalLogin from "../social/socallogin";

export default async function SignupPage() {
  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center gap-5 rounded-sm md:rounded-2xl p-4  shadow-input bg-white dark:bg-black bg-gradient-to-r from-slate-50 to-gray-300">
      <h2 className="text-2xl py-5">Welcome To ZeoCoupon</h2>

      <form action={signinUser} className="flex flex-col gap-5 min-w-[23rem]">
        <Label htmlFor="email" className="text-base">
          Email
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
          ></Input>
        </Label>
        <Label htmlFor="username" className="text-base">
          Username
          <Input
            id="username"
            placeholder="imakhlaq"
            type="text"
            name="username"
          ></Input>
        </Label>
        <Label htmlFor="password" className="text-base">
          Password
          <Input id="password" type="password" name="password"></Input>
        </Label>
        <Button type="submit" className="text-lg py-3 min-w-[60%]">
          Submit
        </Button>
      </form>
      <p>
        Already have an account? <Link href={"/login"}>Login</Link>
      </p>
      <SocalLogin />
    </div>
  );
}
