let basicUrl = "https://www.binance.com/en/trade/LINA_USDT?layout=basic"
let fututerUrl = "https://www.binance.com/en/futures/LINAUSDT_perpetual" 

let basic = basicUrl
let fut = fututerUrl


chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get( tab.tabId, tabInfo => {

        if ( basic === tabInfo.url) {
            console.log("inject into ", tabInfo.url)
            chrome.tabs.executeScript(null, {file:"./content.js"}, console.log("inject content.js into ", tabInfo.url))
            basic = "ok"
        }
    
        if (fut === tabInfo.url) {
            console.log("inject into ", tabInfo.url)
            chrome.tabs.executeScript(null, {file:"./content.js"}, console.log("inject content.js into ", tabInfo.url))
            fut = "ok fuet"
        }
    })
})

// what tabs we work with
let mytabs = []
chrome.tabs.query({active: false, currentWindow: true}, function(tabs) {

    for (i = 0; i< tabs.length; i++) {
        
        if (tabs[i].url === basicUrl ) {
             mytabs.push(tabs[i].id)// = tabs[i] 
        }

        if (tabs[i].url === fututerUrl ) {
             mytabs.push(tabs[i].id)// = tabs[i] 
        }
    
    }

});


var spotMsg  = 0
var futureMsg = 0
var deal = "no"
var start = "nothing"

chrome.runtime.onMessage.addListener(function(msg, sender, response) {

    // get price from spicify tap
    if (sender.url === fututerUrl) {
        futureMsg = msg.message
    }
    
    if (sender.url === basicUrl) {
        spotMsg = msg.message
    }

    // order to by or sell if prices is much

    if ((futureMsg/1000)*3 > futureMsg-spotMsg && deal !== "opened" && start === "start") {
        deal = "opened"
        
        console.log( "OCASIO, spot: ", spotMsg, "futureMsg: ", futureMsg)
        alert ("فرصة دخول ")
        const greeting = new Notification('فرصة دخول '+spotMsg+"  "+futureMsg);
        setTimeout(function() {greeting.close()}, 1000*10)
        
        // send message to all tabs we work with
        for (let i = 0; i< mytabs.length; i++ ) {
            chrome.tabs.sendMessage(mytabs[i], {message: "buy and sull"+futureMsg+" "+spotMsg}, function(response) {
                //console.log(response) // done
            });
        }
        
    }

    // no order if ocasion:
    if (spotMsg >= futureMsg && deal === "opened") {
        for (let i = 0; i< mytabs.length; i++ ) {
            chrome.tabs.sendMessage(mytabs[i], {message: "no ocasion"}, function(response) {
                deal = "done"
                //console.log(response) // done
            });
        }
        const greeting = new Notification('وقت الإغلاق'+spotMsg+"  "+futureMsg);
        setTimeout(function() {greeting.close()}, 1000*10)
        console.log("deal closed")
    }
    response("no ocasion")
    console.log("nothing")
})


