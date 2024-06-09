"use strict";

const whitelist = [ "doi.org", "elsevier.com", "www.google.com", "library.md.chula.ac.th", "lww.com", 
    "mhmedical.com", "sagepub.com", "sciencedirect.com", "springer.com", "tandfonline.com", "onlinelibrary.wiley.com" ];
const blacklist = [ "ajpmonline.org", "chrome://", "google.com", "jahonline.org", "jsad.com", "w3schools.com", "youtube.com" ];

const tabInfo = await getCurrentTab();
const link = tabInfo.url;
const convertButton = document.querySelector('#convert');
const compatStatus = document.querySelector('#status');

let compatChecked = false;

if (tabInfo.url.indexOf("cuml1.md.chula.ac.th") !== -1) compatChecked = true; // it's cuml1, no need to check

if (compatChecked === false) {
    for (let item of whitelist) {
        if (link.indexOf(item) !== -1) {
            compatChecked = true;
            compatStatus.className = "compat-confirm";
            compatStatus.textContent = "✅ compatible";
            break;
        }
    }
}

if (compatChecked === false) {
    for (let item of blacklist) {
        if (link.indexOf(item) !== -1) {
            compatChecked = true;
            convertButton.textContent = "proceed with caution";
            compatStatus.className = "compat-error";
            compatStatus.textContent = "❌ incompatible";
            break;
        }
    }
}

async function getCurrentTab() {
    let queryOptions = { active: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
