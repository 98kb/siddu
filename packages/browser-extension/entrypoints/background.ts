import { addContextMenus } from "./background/addContextMenus";
import { createChromeRuntimeServer } from "@repo/facts-db";
import { db } from "@/lib/db";

const init = () => {
  addContextMenus();
  createChromeRuntimeServer(db);
};

export default defineBackground(() => {
  // Install or activate the service worker and create a keep-alive alarm
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Service worker installed, setting up keep-alive alarm");
    init();
    const around28Seconds = 0.46; // ~28 seconds
    chrome.alarms.create("keepAlive", { periodInMinutes: around28Seconds });
  });

  // Reinitialize the tRPC server when Chrome starts
  chrome.runtime.onStartup.addListener(() => {
    console.log("Service worker started with Chrome");
    init();
  });

  // Keep-alive logic: ensure the service worker stays alive
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "keepAlive") {
      console.log(
        "Keep-alive alarm triggered, keeping the service worker alive",
      );
    }
  });
});
