import {z} from "zod";

export const TimeStampSchema = z.object({
  updatedAt: z.date().optional(),
});
