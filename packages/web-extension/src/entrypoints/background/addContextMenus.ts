import {DbClient} from "@repo/facts-db";

export const addContextMenus = (db: DbClient) => {
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
