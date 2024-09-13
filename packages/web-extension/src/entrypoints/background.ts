import {addContextMenus} from "./background/addContextMenus";
import {createChromeRuntimeServer} from "@repo/facts-service-trpc";

export default defineBackground(() => {
  addContextMenus();
  createChromeRuntimeServer();
});
