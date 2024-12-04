import {z} from "zod";

export const FileSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type FileSchema = z.infer<typeof FileSchema>;
