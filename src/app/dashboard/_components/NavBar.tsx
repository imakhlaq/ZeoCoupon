import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="flex py-4 shadow bg-background">
      <nav className="flex items-center gap-10 container">
        <Link href={"/dashbord"} className="mr-auto">
          <BrandLogo />
        </Link>
        <Link href={"/dashbord/products"}></Link>
        <Link href={"/dashbord/analytics"}></Link>
        <Link href={"/dashbord/subscription"}></Link>
      </nav>
    </header>
  );
}
