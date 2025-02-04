document.getElementById("start").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: startAutoClicker
    });
  });
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: stopAutoClicker
    });
  });
});

function startAutoClicker() {
  if (typeof processElements === "function") {
    processElements();
  } else {
    alert("Script not loaded on this page!");
  }
}

function stopAutoClicker() {
  if (typeof stopClicker === "function") {
    stopClicker();
  } else {
    alert("Auto Clicker is not running!");
  }
}
