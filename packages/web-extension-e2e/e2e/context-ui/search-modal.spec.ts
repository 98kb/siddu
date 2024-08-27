/* eslint-disable max-statements */
// /* eslint-disable max-statements */
// import {describe, it} from "vitest";

import {test} from "~/lib/fixtures/wxt";

// describe("search dialog ui", () => {
//   it("opens when ctrl + . is pressed inside an input");
//   it.todo("opens when ctrl + . is pressed inside a textarea");
//   it.todo("opens when ctrl + . is pressed inside a contenteditable");
//   it.todo(
//     "does not open when ctrl + . is pressed anywhere that is not an input, textarea, or contenteditable",
//   );
//   it.todo("closes when the escape key is pressed");
//   it.todo("closes when the dialog is clicked outside");
//   it.todo("closes when the dialog is clicked on the close button");
// });

// test.describe("search dialog ui", () => {
test("opens when ctrl + . is pressed inside an input", async ({page}) => {
  await page.goto(`https://www.google.com`);
  await page.waitForSelector("textarea");
  await page.focus("textarea");
  await page.keyboard.press("a");
  await page.keyboard.down("Control");
  await page.keyboard.press(".");
  await page.keyboard.up("Control");
  await page.waitForSelector("#dsfx3d");
});
// });
