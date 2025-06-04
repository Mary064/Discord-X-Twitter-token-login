chrome.tabs.onActivated.addListener(activeInfo => {
  updatePopup(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    updatePopup(tabId);
  }
});

function updatePopup(tabId) {
  chrome.tabs.get(tabId, function (tab) {
    if (tab.url.includes('https://discord.com/login')) {
      chrome.action.setPopup({ tabId: tab.id, popup: 'src/popup/popup_Discord.html' });
    } else if (tab.url.includes('https://x.com/i/flow/login')) {
      chrome.action.setPopup({ tabId: tab.id, popup: 'src/popup/popup_X.html' });
    } else {
      chrome.action.setPopup({ tabId: tab.id, popup: 'src/popup/popup.html' });
    }
  });
}

