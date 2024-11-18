import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,
  client: {
    NEXT_PUBLIC_MONGO_URI: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_MONGO_URI: process.env.NEXT_PUBLIC_MONGO_URI,
  },
});

//NOTE for client side env in next u need to add NEXT_PUBLIC_{name}
