import {addContextMenus} from "./background/addContextMenus";
import {createChromeRuntimeServer} from "@repo/facts-service-trpc";
import {db} from "@/lib/db";

export default defineBackground(() => {
  addContextMenus(db);
  createChromeRuntimeServer(db);
});
