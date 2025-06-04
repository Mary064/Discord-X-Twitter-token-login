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
    <svg class="close-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g opacity="0.4"> <path d="M9.16992 14.8299L14.8299 9.16992" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.8299 14.8299L9.16992 9.16992" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
`;

document.body.appendChild(container);

const input = container.querySelector('#twitter_container-input');
const button = container.querySelector('#twitter_container-button');
const closeIcon = document.querySelector('.close-icon')

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

closeIcon.onclick = () => {
    container.remove()
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

