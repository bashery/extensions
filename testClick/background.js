
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get( tab.tabId, tabInfo => {
            chrome.tabs.executeScript(null, {file:"./content.js"}, console.log("inject content.js into ", tabInfo.url))
    })
})

// what tabs we work with
let mytabs = []
chrome.tabs.query({active: false, currentWindow: true}, function(tabs) {
    for (i = 0; i< tabs.length; i++) {
        if (tabs[i].url === "https://gowebexamples.com/http-server/" ) {
             mytabs.push(tabs[i].id)// = tabs[i] 
        }
        if (tabs[i].url === "https://gowebexamples.com/hello-world/" ) {
             mytabs.push(tabs[i].id)// = tabs[i] 
        }
    }
});


var helloMsg  = 0
var serverMsg = 0

chrome.runtime.onMessage.addListener(function(msg, sender, response) {

    // get price from spicify tap
    if (sender.url.substring(26)==="http-server/") {
        serverMsg = msg.message
    }
    
    if (sender.url.substring(26)==="hello-world/") {
        helloMsg = msg.message
    }

    // order to by or sell if prices is much
    if (helloMsg === serverMsg) {
        //response("sell or buy"+serverMsg+" "+helloMsg)
        console.log( sender.url, "helloMsg: ", helloMsg, "serverMsg: ", serverMsg)
        
        // send message to all tabs we work with
        for (let i = 0; i< mytabs.length; i++ ) {
            chrome.tabs.sendMessage(mytabs[i], {message: "buy or sell : "+serverMsg+" "+helloMsg}, function(response) {
                console.log(response.message)
            });
        }
        
    }

    // no order if on price maths
    if (helloMsg !== serverMsg) {
        for (let i = 0; i< mytabs.length; i++ ) {
            chrome.tabs.sendMessage(mytabs[i], {message: "do not doing anything : "+serverMsg+" "+helloMsg}, function(response) {
                console.log(response.message)
            });
        }
    }
    response("nomutch")
    // no price match
    //response("do no doing anything")
})
