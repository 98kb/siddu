import {z} from "zod";

export const BaseSchema = z.object({
  _id: z.string(),
  isDeleted: z.boolean().optional(),
  deletedAt: z.number().optional(),
  updatedAt: z.number().optional(),
  createdAt: z.number().optional(),
});

export type BaseSchema = z.infer<typeof BaseSchema>;
