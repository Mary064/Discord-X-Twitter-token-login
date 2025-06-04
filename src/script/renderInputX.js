const container = document.createElement('container')
const input = document.createElement('input');
const button = document.createElement('button');

container.id = 'twitter_container'

input.type = 'text';
input.placeholder = 'LOGIN VIA TOKEN';
input.id = 'twitter_container-input';


button.id = 'twitter_container-button';
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
    window.location.replace('https://x.com');
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
        window.location.replace('https://x.com');
    }
    return 1
});
