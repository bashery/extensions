


chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get( tab.tabId, tabInfo => {
        //let spicial = tabInfo.url.startsWith("https://www.w3schools") if (spicial) {}
        
        chrome.tabs.executeScript(null, {file:"./content.js"}, console.log("inject content.js into ", tabInfo.url))
        chrome.tabs.executeScript(null, {file:"./style.css"}, console.log("inject style into ", tabInfo.url))
    })
})





