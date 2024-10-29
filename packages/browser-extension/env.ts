import {z} from "zod";

const EnvSchema = z.object({
  WXT_OAUTH_CLIENT_ID: z.string(),
  WXT_BACKUP_FOLDER_NAME: z.string(),
});

export const env = EnvSchema.parse(process.env);
