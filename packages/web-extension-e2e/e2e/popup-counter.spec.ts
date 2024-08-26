import {expect, test} from "~/lib/fixtures/wxt";
import {openPopup} from "~/lib/pages/popup";

test("Popup counter increments when clicked", async ({page, extensionId}) => {
  const popup = await openPopup(page, extensionId);
  expect(await popup.getCounterText()).toEqual("count is 0");

  await popup.clickCounter();
  expect(await popup.getCounterText()).toEqual("count is 1");

  await popup.clickCounter();
  expect(await popup.getCounterText()).toEqual("count is 2");
});
