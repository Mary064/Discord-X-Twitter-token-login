const container = document.createElement('container')
const input = document.createElement('input');
const button = document.createElement('button');

container.id = 'twitter_container'

input.type = 'text';
input.placeholder = 'LOGIN VIA TOKEN';
input.id = 'twitter_container-input';
input.className = 'discord_container-input'

button.id = 'twitter_container-button';
button.className = 'discord_container-button';
button.innerText = 'OK';


console.log("Inject...")


container.appendChild(input)
container.appendChild(button);

document.body.appendChild(container);

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
        location.reload();
    }, 2500);
    container.remove();
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

