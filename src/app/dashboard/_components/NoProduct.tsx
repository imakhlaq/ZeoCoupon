import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

function NoProduct({}: Props) {
  return (
    <div className="mt-32 text-center text-balance">
      <h1 className="text-4xl font-semibold mb-2">You have no Products</h1>
      <p className="mb-4">Get Started with Zeocoupon by creating a product</p>
      <Button size={"lg"} asChild>
        <Link href={"/dashboard/products/new"}>Add Product</Link>
      </Button>
    </div>
  );
}

export default NoProduct;
