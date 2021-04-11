let coin = "ONE"
let basicUrl = "https://www.binance.com/en/trade/"+coin+"_USDT?layout=basic"
let fututerUrl = "https://www.binance.com/en/futures/"+coin+"USDT_perpetual" 

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

let defPrice = 5 
var spotMsg  = 0
var futureMsg = 0
var on = false
var start = 0
var deal = "no"

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    
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
        
        // send message to all tabs we work with
        for (let i = 0; i< mytabs.length; i++ ) {
            // TODO handle responde calback
            chrome.tabs.sendMessage(mytabs[i], {message: "buy and sull"+futureMsg+" "+spotMsg},  function(response ) {
                console.log(response) // done
            } );

        }
        
    }

    // close and earn deal order if ocasion:
    if (spotMsg >= futureMsg && deal === "opened") {
        for (let i = 0; i< mytabs.length; i++ ) {
            // TODO handle responde calback
            chrome.tabs.sendMessage(mytabs[i], {message: "close deal"}, function(response) { 
                console.log(response) 
            });
        }
        
        deal = "done"
        console.log("closed at: spot:", spotMsg, "future :", futureMsg)
    }
    
    if (deal === "opened") {
        console.log("opened")    
    } else {
        console.log("not yet")    
    }

    response("no ocasion")
})


