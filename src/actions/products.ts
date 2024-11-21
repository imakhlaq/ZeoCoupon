"use server";

import { productDetailSchema } from "@/zod_schemas/product";
import { z } from "zod";

export async function createProduct(
  unsafeData: z.infer<typeof productDetailSchema>
) {}
