import { env } from "@/config/env/server";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/drizzle",
  schema: "./src/drizzle/models/schema.ts",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.NEONDB_URL,
  },
});
