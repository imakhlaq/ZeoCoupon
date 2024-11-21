import { auth } from "@/auth";
import { getProducts } from "@/server/db/products";
import { redirect } from "next/navigation";
import NoProduct from "./_components/NoProduct";

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;
  if (user == null) redirect("/login");

  const products = await getProducts(user.id, { limit: 6 });

  if (products.length === 0) return <NoProduct />;
}
