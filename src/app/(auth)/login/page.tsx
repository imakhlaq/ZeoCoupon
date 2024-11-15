import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

export default function page() {
  return (
    <div className=" container max-w-md mt-[15%] flex flex-col gap-5">
      <h2>Welcome To ZeoCoupon</h2>
      <form className="flex flex-col gap-5">
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

      <div>
        <form className="flex gap-5 justify-center">
          <Button className="">
            <FaGithub className="" />
            <p>Github</p>
          </Button>
          <Button>
            <FaGoogle />
            <p>Google</p>
          </Button>
        </form>
      </div>
    </div>
  );
}
