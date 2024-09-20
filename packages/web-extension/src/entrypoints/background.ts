import {addContextMenus} from "./background/addContextMenus";
import {createChromeRuntimeServer} from "@repo/facts-db";
import {db} from "@/lib/db";

export default defineBackground(() => {
  addContextMenus(db);
  createChromeRuntimeServer(db);
});
