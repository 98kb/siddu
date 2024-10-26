import {z} from "zod";

export const AccessTokenRequest = z.object({
  scopes: z.array(z.string()),
});
