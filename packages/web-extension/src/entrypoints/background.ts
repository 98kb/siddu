import {FactsORM} from "@repo/facts-db";
import {RuntimeAdapter, createRouter} from "@repo/runtime-messaging";

const db = new FactsORM(new RuntimeAdapter());
const reply = createRouter(db);

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    reply(message, sendResponse);
    return true;
  });
});
