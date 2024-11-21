import { db } from "@/drizzle/db";

export async function getProducts(
  userId: string,
  { limit }: { limit?: number }
) {
  return await db.query.productTable.findMany({
    where: ({ authId }, { eq }) => eq(authId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    limit,
  });
}
