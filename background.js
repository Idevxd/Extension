chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startAutoClicker" || message.action === "stopAutoClicker") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: message.action === "startAutoClicker" ? startAutoClicker : stopClicker
    });
    sendResponse({ status: "success" });
  }
});
