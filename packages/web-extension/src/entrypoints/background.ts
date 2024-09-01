import {createRouter} from "@repo/runtime-messaging";

const reply = createRouter();

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    reply(message, sendResponse);
    return true;
  });
});
