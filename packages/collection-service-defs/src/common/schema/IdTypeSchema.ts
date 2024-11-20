import {z} from "zod";

export const IdTypeSchema = z.object({
  _id: z.string(),
});

export type IdTypeSchema = z.infer<typeof IdTypeSchema>;
