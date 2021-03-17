// background.js
var dev_injecte = false
chrome.tabs.onActivated.addListener(tab => {
	//console.log(tab);
	chrome.tabs.get(tab.tabId, current_tab_info => {
        if (current_tab_info.url.startsWith("https://www.w3schools.com") ) {
            chrome.tabs.executeScript(null, {file: "./forground.js"})
            chrome.tabs.insertCSS(null, {file: "./style.css"}, ()=> console.log("injecte css to "+current_tab_info.url))
        };
        if (current_tab_info.url.startsWith("https://developer.chrome.com") ) {
            if (dev_injecte == false) {
	            chrome.tabs.executeScript(null, {file: "./forground.js"}, ()=> console.log("injecte a malware in "+current_tab_info.url))
                //chrome.tabs.insertCSS(null, {file: "./style.css"}, ()=> console.log("injecte css to "+current_tab_info.url))
                dev_injecte = true
            }
        };
	})
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {

    console.log("senderis "+ sender.tab.tabId)
    if(request.message === "check the storage") {
        chrome.tabs.sendMessage(activeTabId, {message: "yo i get your message"})
        sendResponse({message: "yo I get your cute message"})
        chrome.storage.local.get("password", value => {
            console.log(value)
        })
    } 
})
