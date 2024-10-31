import {z} from "zod";

export const ClearAccessTokenRequest = z.object({
  token: z.string(),
});

export type ClearAccessTokenRequest = z.infer<typeof ClearAccessTokenRequest>;
