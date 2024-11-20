import { env } from "@/config/env/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/drizzle/models/schema";

const sql = neon(env.NEONDB_URL);
export const db = drizzle(sql, { schema });
