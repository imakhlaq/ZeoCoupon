import { db } from "@/drizzle/db";
import { userSubscriptonTable } from "@/drizzle/models/products";

export async function createSubscription(
  data: typeof userSubscriptonTable.$inferInsert
) {
  await db.insert(userSubscriptonTable).values(data).onConflictDoNothing({
    target: userSubscriptonTable.authUserId, // if their is conflict on this column do nothing
  });
}
