import { sendMessage } from "./sendMessage";

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

  chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === id && info.selectionText) {
      sendMessage({ type: "addFact", payload: info.selectionText });
    }
  });
};
