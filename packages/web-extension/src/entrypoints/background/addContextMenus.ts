import {DexieAdapter} from "@repo/facts-db-adapter";
import {ORM, createFactsDB} from "@repo/facts-db";

const db = createFactsDB("facts");
const facts = new ORM(new DexieAdapter(db, "facts"));

export const addContextMenus = () => {
  const id = "add-to-facts";

  chrome.contextMenus.create(
    {
      id,
      title: 'Add "%s"',
      contexts: ["selection"],
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    },
  );

  chrome.contextMenus.onClicked.addListener(info => {
    if (info.menuItemId === id && info.selectionText) {
      facts.objects.addOne({content: info.selectionText});
    }
  });
};
