let autoClickerRunning = false;
let clickerTimeouts = [];

function processElements() {
  autoClickerRunning = true;

  var elementsToClick = document.querySelectorAll('div[data-state="closed"] .cursor-pointer'),
      claimButtonSelector = "button.bg-primary:not([disabled]).w-full",
      closeButtonSelector = "button.absolute.rounded-sm.opacity-70.right-5.top-6.sm\\:right-9.sm\\:top-9";

  function clickElement(element) {
    var event = new MouseEvent("click", { view: window, bubbles: true, cancelable: true });
    element.dispatchEvent(event);
  }

  function closePopup() {
    if (!autoClickerRunning) return;
    var closeButton = document.querySelector(closeButtonSelector);
    if (closeButton) {
      clickElement(closeButton);
      console.log("Popup closed.");
    }
  }

  function checkClaimButton() {
    if (!autoClickerRunning) return;
    var claimButton = document.querySelector(claimButtonSelector);
    if (claimButton) {
      clickElement(claimButton);
      console.log("Claim button clicked.");
      clickerTimeouts.push(setTimeout(closePopup, 2000));
      return true;
    }
    return false;
  }

  function checkConditionsAndRetry() {
    if (!autoClickerRunning) return;
    var waitForClass = document.querySelector(".text-size-14.font-bold"),
        successIcons = document.querySelectorAll('.success-icon');

    if (waitForClass || successIcons.length !== elementsToClick.length) {
      clickerTimeouts.push(setTimeout(processElements, 60000));
    } else {
      checkClaimButton();
    }
  }

  alert("Galxe Auto Clicker Started!");
  if (checkClaimButton()) {
    alert("All tasks completed!");
  } else {
    elementsToClick.forEach(clickElement);
    clickerTimeouts.push(setTimeout(() => {
      document.querySelectorAll('svg[data-state="closed"] .ml-4.flex.gap-4.items-center').forEach(clickElement);
      clickerTimeouts.push(setTimeout(checkConditionsAndRetry, 2000));
    }, 2000));
  }
}

// Stop function to clear all timeouts and stop execution
function stopClicker() {
  autoClickerRunning = false;
  clickerTimeouts.forEach(clearTimeout);
  clickerTimeouts = [];
  alert("Auto Clicker Stopped!");
}
