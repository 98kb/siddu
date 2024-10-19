import {EnvSchema} from "./src/common/EnvSchema";
import {beforeAll} from "vitest";
import {existsSync} from "node:fs";
import dotenv from "dotenv";
import mongoose from "mongoose";

if (existsSync(".env.test")) {
  dotenv.config({path: ".env.test"});
}

const testEnv = EnvSchema.parse(process.env);

beforeAll(async () => {
  await mongoose.connect(testEnv.MONGO_URI);
});
