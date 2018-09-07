function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        token: document.querySelector("#token").value,
        url: document.querySelector("#url").value
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#token").value = result.token || "";
        document.querySelector("#url").value = result.url || "";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.sync.get(["token", "url"]);
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);