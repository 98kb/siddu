import {addContextMenus} from "./background/addContextMenus";
import {createChromeRuntimeServer} from "@repo/facts-service-trpc";
// import {addFactsDbMessaging} from "./background/addFactsDbMessaging";

export default defineBackground(() => {
  // addFactsDbMessaging();
  addContextMenus();
  createChromeRuntimeServer();
});
