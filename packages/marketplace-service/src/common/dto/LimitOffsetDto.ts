import {z} from "zod";

export const LimitOffsetDto = z.object({
  limit: z.number().int().positive(),
  offset: z.number().int().nonnegative(),
});

export type LimitOffset = z.infer<typeof LimitOffsetDto>;
