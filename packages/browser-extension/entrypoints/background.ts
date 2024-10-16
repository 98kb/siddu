import { createChromeRuntimeServer } from "@repo/facts-db";
import { db } from "@/lib/db";

export default defineBackground(() => {
  // Install or activate the service worker and create a keep-alive alarm
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Service worker installed, setting up keep-alive alarm");
    const around28Seconds = 0.46; // ~28 seconds
    chrome.alarms.create("keepAlive", { periodInMinutes: around28Seconds });
    createChromeRuntimeServer(db);
  });

  // Reinitialize the tRPC server when Chrome starts
  chrome.runtime.onStartup.addListener(() => {
    console.log("Service worker started with Chrome");
    createChromeRuntimeServer(db);
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
