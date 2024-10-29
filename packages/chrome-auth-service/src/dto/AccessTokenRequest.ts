import {z} from "zod";

export const AccessTokenRequest = z.object({
  scopes: z.array(z.string()),
});

export type AccessTokenRequest = z.infer<typeof AccessTokenRequest>;
