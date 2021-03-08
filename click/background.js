
let injected = false
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get( tab.tabId, tabInfo => {
        if (tabInfo.url.startsWith("https://www.w3schools")) {
            chrome.tabs.executeScript(null, {file:"./content.js"}, console.log("inject content.js into ", tabInfo.url))
            chrome.tabs.executeScript(null, {file:"./style.css"}, console.log("inject style into ", tabInfo.url))
        }
    })
})

var msg

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
    msg = request.message
    console.log("message is : ", request.message, "from:", sender.url);
    //sendResponse({message:msg})
    chrome.runtime.sendMessage({message:msg})
})

// setTimeout(() => { ... }, 2000);
