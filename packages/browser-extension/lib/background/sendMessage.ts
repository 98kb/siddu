export const sendMessage = async (message: any) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  tab.id && chrome.tabs.sendMessage(tab.id, message);
};
