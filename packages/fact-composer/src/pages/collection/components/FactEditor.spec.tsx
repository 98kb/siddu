import {test, expect} from "@playwright/experimental-ct-react";
import {FactEditor} from "./FactEditor";
import {sleep} from "~/lib/sleep";
import {FactSchema} from "@repo/collection-service-defs";

const createFact = (): FactSchema => ({
  _id: "0",
  content: "This sample content",
  labels: [],
});

test("it sets fact content as the editor textarea value on mount", async ({
  mount,
}) => {
  const fact = createFact();
  const component = await mount(
    <FactEditor fact={fact} onChange={patch => Object.assign(fact, patch)} />,
  );
  await expect(component.locator("textarea")).toHaveValue(
    "This sample content",
  );
});
test("it invokes onChange listener immediately when content changes in textarea fo the first time", async ({
  mount,
}) => {
  const fact = createFact();
  const component = await mount(
    <FactEditor fact={fact} onChange={patch => Object.assign(fact, patch)} />,
  );
  await component.locator("textarea").press("Delete");
  await expect(fact.content).toBe("his sample content");
});
// eslint-disable-next-line max-statements
test("it debounces onChange invocation to once every 300ms after the first invocation", async ({
  mount,
}) => {
  const fact = createFact();
  let onChangeInvocationCount = 0;
  const component = await mount(
    <FactEditor
      fact={fact}
      onChange={patch => {
        onChangeInvocationCount++;
        Object.assign(fact, patch);
      }}
    />,
  );
  // first change
  await component.locator("textarea").press("Delete");
  await expect(fact.content).toBe("his sample content");
  await expect(onChangeInvocationCount).toBe(1);
  // second change
  await component.locator("textarea").press("Delete");
  await component.locator("textarea").press("Delete");
  await component.locator("textarea").press("Delete");
  await component.locator("textarea").press("Delete");
  await sleep(350);
  await expect(onChangeInvocationCount).toBe(2); // although delete was pressed thrice but the on change invoked only twice
  await expect(fact.content).toBe("sample content");

  //third change
  await component.locator("textarea").pressSequentially("Ti");
  await expect(onChangeInvocationCount).toBe(3); // invoked immediately cos it's the first change after the debounce period ended
  await component.locator("textarea").press("Backspace");
  await component.locator("textarea").pressSequentially("his ");
  await sleep(350);
  await expect(fact.content).toBe("This sample content");
  await expect(onChangeInvocationCount).toBe(4);
});
