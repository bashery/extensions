
let defPrice =  5
let basicUrl = "https://www.binance.com/en/trade/ONE_USDT?layout=basic"
let basicUrl2 = "https://www.binance.com/en/trade/ONE_USDT?layout=basic&type=spot"
let fututerUrl = "https://www.binance.com/en/futures/ONEUSDT_perpetual" 

let basic = basicUrl
let basic2 = basicUrl2
let fut = fututerUrl

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get( tab.tabId, tabInfo => {

        if ( basic === tabInfo.url || basic2 === tabInfo.url) {
            chrome.tabs.executeScript(null, {file:"./content.js"}, console.log("inject content.js into ", tabInfo.url))
            basic = "ok"
            basic2 = "ok"
        }
    
        if (fut === tabInfo.url) {
            chrome.tabs.executeScript(null, {file:"./content.js"}, console.log("inject content.js into ", tabInfo.url))
            fut = "ok"
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
var on = false
var start = 0
var deal = "no"
var asset = 9999999999.0
var msgasset = 9999999999.0

chrome.runtime.onMessage.addListener(function(msg, sender, response) {


    // all is already ?
    if (msg.startMsg) {
        console.log("starting bot", msg.startMsg)
        start++ 
    } else if (msg.startMsg === false){
        console.log("stoping bot", msg.startMsg)
        start--
    }

    if (start === 2) {
        on = true
    } else {
        on = false
    }


    // get assets and parse it
    msgasset = parseFloat(msg.asset)
    if (msgasset < asset) {
        asset = parseFloat(msg.asset)
    }

    // get price from spicify tap
    if (sender.url === fututerUrl) {
        futureMsg = msg.message
    }
    
    if (sender.url === basicUrl || sender.url === basicUrl2) {
        spotMsg = msg.message
    }


    // order to by or sell if prices is much
    if ((futureMsg/1000) * defPrice <= futureMsg-spotMsg && deal !== "opened" && on) { // TODO i not sure her > or < ??
        deal = "opened"
        console.log( "OCASIO, open at : spot:", spotMsg, "future:", futureMsg)
        console.log("ssset: ", asset)
        

        // send message to all tabs we work with
        for (let i = 0; i< mytabs.length; i++ ) {
            // TODO handle responde calback
            chrome.tabs.sendMessage(mytabs[i], {message: "open", asset:asset},  function(/*response*/ ) {
                console.log(/*response*/) // done
            } );

        }
        
    }

    // close and earn deal order if ocasion:
    if (spotMsg >= futureMsg && deal === "opened") {
        // TODO parse and send assets
        for (let i = 0; i< mytabs.length; i++ ) {
            // TODO handle responde calback
            chrome.tabs.sendMessage(mytabs[i], {message: "close"}, function(response) { 
                console.log(response) 
            });
        }
        
        deal = "done"
        console.log("closed at: spot:", spotMsg, "future :", futureMsg)
    }
    
    if (deal === "opened") {
        console.log("ocasion opened")    
    } else {
        console.log("not yet")    
    }

    response("no ocasion")
})

