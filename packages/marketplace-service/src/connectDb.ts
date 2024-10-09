import {env} from "./env";
import mongoose from "mongoose";

export async function connectDb() {
  await mongoose.connect(env.MONGO_URI);
  console.log("db conn");
}
