import {FactSchema} from "./FactSchema";
import {z} from "zod";

export const UpdateFactSchema = z.object({
  ...FactSchema.partial().shape,
  ...FactSchema.pick({_id: true}).shape,
});

export type UpdateFactSchema = z.infer<typeof UpdateFactSchema>;
