import {z} from "zod";

export const OrderBySchema = z.object({
  key: z.string(),
});

export type OrderBySchema = z.infer<typeof OrderBySchema>;
