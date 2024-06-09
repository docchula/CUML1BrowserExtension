"use strict";

const tabInfo = await getCurrentTab();
const link = tabInfo.url;
const convertButton = document.querySelector('#convert');

if (tabInfo.url.indexOf("cuml1.md.chula.ac.th") !== -1) {
    const headerStack = document.querySelector('#headerStack');
    const inCUML1 = document.createElement('p');
    inCUML1.id = "inCUML1";
    inCUML1.textContent = "you're already in CUML1";
    headerStack.append(inCUML1);

    convertButton.textContent = "go back to normal link"
    
    document.querySelector("#compatStack").remove();

    convertButton.addEventListener('click', async () => {
        let newURL = await convertFromCUML1(link);
        if (newURL.split('/')[2] === "login") newURL = "chrome://newtab"; // special case for CUML1 homepage

        await chrome.tabs.update({ url: newURL });
    });
} else {
    convertButton.addEventListener('click', async () => {
        let newURL = await convertToCUML1(link);
        if (newURL.split(':')[0] === "chrome") newURL = "https://cuml1.md.chula.ac.th/"; // special case for chrome tabs
        
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
