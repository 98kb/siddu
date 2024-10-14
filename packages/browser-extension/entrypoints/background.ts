import { createChromeRuntimeServer } from "@repo/facts-db";
import { db } from "@/lib/db";

export default defineBackground(() => {
  createChromeRuntimeServer(db);
});
