import {addContextMenus} from "@/lib/background/addContextMenus";
import {createRuntimeServer} from "@/lib/background/createRuntimeServer";

const init = () => {
  addContextMenus();
  createRuntimeServer();
};

export default defineBackground(() => {
  // Install or activate the service worker and create a keep-alive alarm
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Service worker installed, setting up keep-alive alarm");
    init();
    // ~28 seconds because chrome disconnects after 30 seconds of inactivity
    const around28Seconds = 0.46;
    // TODO: make it smarter, e.g. reset the alarm when the service worker is used
    chrome.alarms.create("keepAlive", {periodInMinutes: around28Seconds});
  });

  // Reinitialize the tRPC server when Chrome starts
  chrome.runtime.onStartup.addListener(() => {
    console.log("Service worker started with Chrome");
    init();
  });

  // Keep-alive logic: ensure the service worker stays alive
  chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === "keepAlive") {
      console.log(
        "Keep-alive alarm triggered, keeping the service worker alive",
      );
    }
  });
});
