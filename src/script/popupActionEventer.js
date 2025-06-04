document.getElementById('setCookies').addEventListener('click', async () => {
    const token = document.getElementById('textAreaInputToken').value;

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.tabs.sendMessage(tab.id, { action: 'setCookie', value: token }, (response) => {
        if (chrome.runtime.lastError) {
            alert("Error " + chrome.runtime.lastError.message);
        }
    });
});
