// BTT bot
let defPrice =  5
let basicUrl = "https://www.binance.com/en/trade/BTT_USDT?layout=basic"
let fututerUrl = "https://www.binance.com/en/futures/BTTUSDT_perpetual" 

let basic = basicUrl
let fut = fututerUrl

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get( tab.tabId, tabInfo => {

        if ( basic === tabInfo.url) {
            chrome.tabs.executeScript(null, {file:"./content.js"}, console.log("inject content.js into ", tabInfo.url))
            basic = "ok"
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
    //console.log("On : ", on, "asset : ", asset)
    

    // get price from spicify tap
    if (sender.url === fututerUrl) {
        futureMsg = msg.message
    }
    
    if (sender.url === basicUrl) {
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
            chrome.tabs.sendMessage(mytabs[i], {message: "open", asset:asset},  function(response ) {
                console.log(response) // done
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
        console.log("opened")    
    } else {
        console.log("no yet")    
    }

    response("no ocasion")
})

// helper function

function isOn(start) {
    if (start === 2) {
        return true
    }
        return false
}

function isStart(startMessage) {
    if (startMessage) {
        console.log("starting bot", startMessage)
        return 1
    } else if (startMessage === false){
        console.log("stoping bot",startMessage )
        return -1
    }
 
}
