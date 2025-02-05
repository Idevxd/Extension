document.getElementById("start").addEventListener("click", () => {
  sendMessageToBackground("startAutoClicker");
  showNotification("Auto Clicker Started ✅");
});

document.getElementById("stop").addEventListener("click", () => {
  sendMessageToBackground("stopAutoClicker");
  showNotification("Auto Clicker Stopped ❌");
});

function sendMessageToBackground(action) {
  chrome.runtime.sendMessage({ action: action });
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.background = "rgba(0, 0, 0, 0.7)";
  notification.style.color = "#fff";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "8px";
  notification.style.fontSize = "14px";
  notification.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";
  notification.style.transition = "opacity 0.3s ease, bottom 0.3s ease";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.bottom = "10px";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}
