import {z} from "zod";

export const EnvSchema = z.object({
  PORT: z.string().default("3000").transform(Number),
  MONGO_URI: z.string(),
});
