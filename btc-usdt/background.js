let basic = "https://www.binance.com/en/trade/BTC_USDT?layout=basic"
let fut = "https://www.binance.com/en/futures/BTCUSDT_perpetual"

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
        
        if (tabs[i].url === "https://www.binance.com/en/trade/BTC_USDT?layout=basic" ) {
             mytabs.push(tabs[i].id)// = tabs[i] 
        }

        if (tabs[i].url === "https://www.binance.com/en/futures/BTCUSDT_perpetual" ) {
             mytabs.push(tabs[i].id)// = tabs[i] 
        }
    
    }

});


var spotMsg  = 0
var futureMsg = 0

chrome.runtime.onMessage.addListener(function(msg, sender, response) {

    // get price from spicify tap
    if (sender.url ==="https://www.binance.com/en/futures/BTCUSDT_perpetual") {
        futureMsg = msg.message
    }
    
    if (sender.url === "https://www.binance.com/en/trade/BTC_USDT?layout=basic") {
        spotMsg = msg.message
    }

    // order to by or sell if prices is much
    if (futureMsg === spotMsg) {
        //response("sell or buy"+serverMsg+" "+helloMsg)
        console.log( "spot: ", spotMsg, "futureMsg: ", futureMsg)
        
        // send message to all tabs we work with
        for (let i = 0; i< mytabs.length; i++ ) {
            chrome.tabs.sendMessage(mytabs[i], {message: "buy or sell : "+futureMsg+" "+spotMsg}, function(response) {
                //console.log(response) // done
            });
        }
        
    }

    // no order if on price maths
    if (spotMsg !== futureMsg) {
        console.log("nomutch")
        for (let i = 0; i< mytabs.length; i++ ) {
            chrome.tabs.sendMessage(mytabs[i], {message: "no match"}, function(response) {
                //console.log(response) // done
            });
        }
    }
    response("nomutch")
    // no price match
    //response("do no doing anything")
})
