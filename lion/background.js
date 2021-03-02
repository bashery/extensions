window.coins = {}

chrome.runtime.onMessage.addListener(function(request,  sender, sendResponse) {
    console.log(request)
    window.coins[request.url] = request.count

})

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url:"popup.html"})
})
