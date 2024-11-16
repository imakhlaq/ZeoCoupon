import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signInAction } from "@/actions/users";
import SocalLogin from "../social/socallogin";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth(); //to get access user session inside a server componet
  //simple route protection
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className=" container max-w-md mt-[15%] flex flex-col gap-5">
      <h2>Welcome To ZeoCoupon</h2>
      {/* using server actions to grab the form data and making db calls i.e server stuff */}
      <form action={signInAction} className="flex flex-col gap-5">
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
        Don&apos;t have an account? <Link href={"/signup"}>Login</Link>
      </p>
      <SocalLogin />
    </div>
  );
}
