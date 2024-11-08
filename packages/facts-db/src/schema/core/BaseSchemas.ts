import {z} from "zod";

export const BaseSchema = z.object({
  id: z.number(),
  isDeleted: z.boolean().optional(),
  deletedAt: z.number().optional(),
  updatedAt: z.number().optional(),
});
