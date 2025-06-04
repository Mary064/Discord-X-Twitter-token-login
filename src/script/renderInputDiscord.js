const container = document.createElement('div');
container.id = 'twitter_container';

container.innerHTML = `
    <input 
        type="text" 
        id="twitter_container-input"
        class="discord_container-input"
        placeholder="LOGIN VIA TOKEN"
    />
    <button 
        id="twitter_container-button"
        class="discord_container-button"
    >OK</button>
`;

document.body.appendChild(container);

const input = container.querySelector('#twitter_container-input');
const button = container.querySelector('#twitter_container-button');

const validateInput = (data) => {
    if (data.trim() === "" || data.trim().length < 20) {
        console.log("Please enter a valid token");
        return !1;
    }
    return 1
}

button.onclick = () => {
    if(!validateInput(input.value)) return !1
    login(input.value)
}


function login(token) {

    setInterval(() => {
        document.body.appendChild(document.createElement`iframe`)
            .contentWindow.localStorage.token = `"${token}"`;
    }, 50);
    setTimeout(() => {
        container.remove();
        location.reload();
    }, 2500);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'setCookie') {
        if (!validateInput(msg.value)) {
            sendResponse({ success: false, error: "Invalid token" });
            return;
        }
        login(msg.value);
        sendResponse({ success: true });
    }
});

