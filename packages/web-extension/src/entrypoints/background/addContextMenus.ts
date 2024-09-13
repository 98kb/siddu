import {DexieAdapter, FactsService} from "@repo/facts-service";
import {createFactsDB} from "@repo/facts-db";

const db = new FactsService(
  table => new DexieAdapter(table, createFactsDB("facts")),
);

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
      db.facts.add({content: info.selectionText});
    }
  });
};
