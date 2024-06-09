"use strict";

const tabInfo = await getCurrentTab();
const link = tabInfo.url;
const convertButton = document.querySelector('#convert');
// const compatStatus = document.querySelector('#status');

if (tabInfo.url.indexOf("cuml1.md.chula.ac.th") !== -1) {
    convertButton.disabled = true;
    convertButton.className = "compat-error";
    convertButton.textContent = "link is already in CUML1";

    const buttonStack = document.querySelector('#buttonStack');
    const convertBack = document.createElement('button');
    convertBack.textContent = "convert back to normal link"
    convertBack.addEventListener('click', async () => {
        let newURL = await convertFromCUML1(link);
        if (newURL.split('/')[2] === "login") newURL = "https://www.google.com"; // special case for CUML1 homepage
        await chrome.tabs.update({ url: newURL });
    });
    buttonStack.append(convertBack);

    document.querySelector("#compatStack").remove();
} else {
    convertButton.addEventListener('click', async () => {
        let newURL = await convertToCUML1(link);
        await chrome.tabs.update({ url: newURL });
    });
}

// helper functions

async function getCurrentTab() {
    let queryOptions = { active: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function convertToCUML1(url) {
    let array = url.split('/');
    array[2] = array[2].replace(/\./g, '-') + ".cuml1.md.chula.ac.th";
    return array.join('/');
}

function convertFromCUML1(url) {
    let array = url.split('/');
    array[2] = array[2].replace(".cuml1.md.chula.ac.th", "").replace(/\-/g, '.');
    return array.join('/');
}
