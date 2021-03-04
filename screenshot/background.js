;(function(){
    console.log("start from background.js")
    bot()
})()


function bot () {
    chrome.browserAction.onClicked.addListener(takePhoto);

    function takePhoto(tabs) {
        console.log("test tab", tabs.id) // ??
    
        chrome.tabs.captureVisibleTab(null, {}, function(dataUrl){ 
            chrome.tabs.sendMessage(tabs.id, dataUrl)
        }) 
    }
}
