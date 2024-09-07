import {addContextMenus} from "./background/addContextMenus";
import {addFactsDbMessaging} from "./background/addFactsDbMessaging";

export default defineBackground(() => {
  addFactsDbMessaging();
  addContextMenus();
});
