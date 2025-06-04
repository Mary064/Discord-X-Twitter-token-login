const container = document.createElement('div')
container.id = "twitter_container"

container.innerHTML = `
    <input 
        type="text" 
        id="twitter_container-input"
        placeholder="LOGIN VIA TOKEN"
    />
    <button 
        id="twitter_container-button"
    >OK</button>
`


console.log("Inject...")

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
const getExpensiveDate = () => {
    const expTime = new Date();
    expTime.setFullYear(expTime.getFullYear() + 1);
    return expTime;
}

button.onclick = () => {
    if(!validateInput(input.value)){ return !1}

    const token = input.value;

    let expTime = getExpensiveDate()

    document.cookie = `auth_token=${token.replace('"', '')};domain=x.com;path=/;expires=${expTime.toUTCString()};Secure`;

    container.remove();

    setTimeout(() => {
        window.location.replace('https://x.com');
    }, 100)
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (!validateInput(msg.value)) {
        sendResponse({ success: false, error: "Invalid token" });
        return
    }

    let expTime = getExpensiveDate()

    if (msg.action === 'setCookie') {
        document.cookie = `auth_token=${msg.value.replace('"', '')};domain=x.com;path=/;expires=${expTime.toUTCString()};Secure`;
        sendResponse({ success: true });
        container.remove();

        setTimeout(() => {
            window.location.replace('https://x.com');
        }, 100)
    }
    return 1
});
