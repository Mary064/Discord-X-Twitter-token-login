chrome.tabs.onActivated.addListener(activeInfo => {
  if (activeInfo && activeInfo.tabId !== undefined) {
    updatePopup(activeInfo.tabId);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    updatePopup(tabId);
  }
});

function updatePopup(tabId) {
  if (!tabId) return;

  chrome.tabs.get(tabId, function (tab) {
    if (chrome.runtime.lastError) {
      console.warn("Failed to get tab:", chrome.runtime.lastError.message);
      return;
    }

    if (!tab || !tab.url) {
      console.warn("Tab or tab.url is undefined", tab);
      return;
    }

    if (tab.url.includes('https://discord.com/login')) {
      chrome.action.setPopup({ tabId: tab.id, popup: 'src/popup/popup_Discord.html' });
    } else if (tab.url.includes('https://x.com/i/flow/login')) {
      chrome.action.setPopup({ tabId: tab.id, popup: 'src/popup/popup_X.html' });
    } else {
      chrome.action.setPopup({ tabId: tab.id, popup: 'src/popup/popup.html' });
    }
  });
}
