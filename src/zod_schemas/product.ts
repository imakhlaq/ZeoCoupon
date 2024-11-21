import { z } from "zod";

export const productDetailSchema = z.object({
  name: z.string().min(1, { message: "It has to be more than one" }),
  url: z
    .string()
    .url()
    .min(1, { message: "Url is required" })
    .transform(removeTrailingSlash), //after validation it will be pass to the function
  description: z.string().optional(),
});
export function removeTrailingSlash(path: string) {
  return path.replace(/\/$/, "");
}
