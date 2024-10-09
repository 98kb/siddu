import "dotenv/config";
import {EnvSchema} from "./common/EnvSchema";

export const env = EnvSchema.parse(process.env);
