import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    MONGO_URI: z.string().url(),
  },
  experimental__runtimeEnv: process.env,
});
