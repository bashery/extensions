var future = true
var classic = true
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get( tab.tabId, tabInfo => {
        if (classic && tabInfo.url === "https://www.binance.com/en/trade/BTC_USDT?layout=basic") {
            chrome.tabs.executeScript(null, {file:"./content.js"}, console.log("inject content.js into ", tabInfo.url))
            classic = false
        }
        if (future && tabInfo.url === "https://www.binance.com/en/futures/BTC_USDT") {
            chrome.tabs.executeScript(null, {file:"./content.js"}, console.log("inject content.js into ", tabInfo.url))
            future = false
        }
    })
})


chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    console.log(msg, sender.url)
    response(msg)
})

