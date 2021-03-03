;(function(){
    console.log("ok. this is frent end")
    bot()
}())

function bot () {
chrome.runtime.onMessage.addListener(takePhoto);
function takePhoto(message, sender, sendResponse) {
    let dataExtension = message.substring(0, message.lastIndexOf("base64"));
    let extension = dataExtension.substring(dataExtension.lastIndexOf("/") + 1, dataExtension.lastIndexOf(";"));
    
    let link = document.createElement("a");
    link.href = message
    link.download = "screenshot."+ extension;
    link.click();
    link.remove();
    console.log("sender and response is : ", sender, sendResponse)
}
}
