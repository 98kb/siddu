import {z} from "zod";

export const OrderBySchema = z.object({
  key: z.string(),
  desc: z.boolean().optional(),
});

export type OrderBySchema = z.infer<typeof OrderBySchema>;
