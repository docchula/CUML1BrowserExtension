"use strict";

const body = document.querySelector('body');
const slider = document.querySelector('.slider');
const darkmode = document.querySelector('#darkmode');

chrome.storage.sync.get('darkmode', (data) => {
    console.log(data.darkmode);
    if (data.darkmode) {
        slider.classList.add("deanimated");
        darkmode.checked = true;
        body.classList.add("darkmode");
        setTimeout(() => {
            slider.classList.remove("deanimated");
            body.classList.add("animated");
            // document.querySelector('a').classList.add("animated");
        }, 500); // css animation 0.5 sec
    } else {
        body.classList.add("animated");
        // document.querySelector('a').classList.add("animated");
    }
});

darkmode.addEventListener('click', async () => {
    if (darkmode.checked) {
        body.classList.add("darkmode");
        chrome.storage.sync.set({ darkmode: true });
    } else {
        body.classList.remove("darkmode");
        chrome.storage.sync.set({ darkmode: false });
    }
});
