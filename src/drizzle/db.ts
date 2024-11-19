import { env } from "@/config/env/server";
import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(env.NEONDB_URL);
