"use server";

import { auth } from "@/auth";
import { productDetailSchema } from "@/zod_schemas/product";
import { error } from "console";
import { z } from "zod";

export async function createProduct(
  unsafeData: z.infer<typeof productDetailSchema>
) {
  const session = await auth();
  const { success, data } = productDetailSchema.safeParse(unsafeData);

  if (session?.user === null || !success) {
    return {
      error: true,
      message: "There was an error while creating your product",
    };
  }
}
