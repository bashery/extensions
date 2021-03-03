;(function(){
    console.log("start from background.js")
    bot()
})()


function bot () {
chrome.browserAction.onClicked.addListener(takePhoto);
function takePhoto(tabs) {
    //chrome.tabs.get(tabs[0], console.log(tabs[0]))
    chrome.tabs.captureVisibleTab(null, {}, function(dataUrl){ 
        chrome.tabs.sendMessage(tabs.id, dataUrl)
        
    }) 
}
}
