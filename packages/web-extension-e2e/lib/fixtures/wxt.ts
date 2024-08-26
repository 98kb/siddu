/* eslint-disable no-empty-pattern */
/* eslint-disable max-statements */
/* eslint-disable complexity */
import {type BrowserContext, test as base, chromium} from "@playwright/test";
import {fileURLToPath} from "node:url";

const pathToExtension = fileURLToPath(
  import.meta.resolve("../../../web-extension/.output/chrome-mv3"),
);

console.log(pathToExtension);

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext("", {
      headless: true,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({context}, use) => {
    let background: {url(): string};
    [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent("serviceworker");
    }

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
});
export const expect = test.expect;
