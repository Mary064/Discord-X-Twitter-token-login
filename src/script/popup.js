document.getElementById("openXLinks").addEventListener("click", () => {
  chrome.tabs.create({ url: "https://x.com/i/flow/login" });
});

document.getElementById("openDiscordLinks").addEventListener("click", () => {
  chrome.tabs.create({ url: "https://discord.com/login" });
});