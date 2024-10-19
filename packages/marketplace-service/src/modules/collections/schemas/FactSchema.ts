import {z} from "zod";

export const FactSchema = z.object({
  title: z.string().nullish().optional(),
  content: z.string(),
});

export type TFactSchema = z.infer<typeof FactSchema>;
