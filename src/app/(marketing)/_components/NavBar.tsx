import { auth } from "@/auth";
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import React from "react";

async function NavBar() {
  const session = await auth();

  const user = session?.user;

  return (
    <header className="flex py-6 shadow-xl fixed top-0 w-full z-10 bg-background/90">
      {/*containerallows us to confind the space this can take*/}
      <nav className="flex items-center gap-10 container font-semibold">
        <Link href={"/"} className="mr-auto">
          <BrandLogo />
        </Link>

        <Link className="text-lg" href={"#"}>
          Features
        </Link>
        <Link className="text-lg" href={"/#pricing"}>
          Pricing
        </Link>
        <Link className="text-lg" href={"#"}>
          About
        </Link>
        <span className="text-lg">
          {user ? (
            <Link href={"/dashboard"}>Dashboard</Link>
          ) : (
            <Link href={"/login"}>Login</Link>
          )}
        </span>
      </nav>
    </header>
  );
}

export default NavBar;
