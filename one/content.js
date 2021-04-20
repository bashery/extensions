// control buttons
let btn = document.createElement('button')

btn.innerText = " تشغيل "
document.querySelector('header').appendChild(btn)

let start = false
btn.onclick = function() {
    if (!start) {
        btn.innerText = " إيقاف "
        start = true
        //console.log("bot started")
        chrome.runtime.sendMessage({startMsg:start}, function(resp) {    console.log(resp)    })
    } else {
        start = false 
        btn.innerText = " تشغيل "
        //console.log("bot sleep")
        chrome.runtime.sendMessage({startMsg:start}, function(resp) {    console.log(resp)    })
    } 
}



sleeptime = 100 

if (!window.location.href.endsWith("perpetual")) {
    sleeptime = 101
}

let price = document.querySelector('.showPrice')
let prc = 0.0
var asset
var bot = false

//let inc = 0

price.onclick = function() {

    //inc ++
    prc = parseFloat(price.innerText.replace(",", ""))
    if (window.location.href.endsWith("perpetual")) {
        asset = document.querySelector('#__APP > div > div > div > div.css-e4zj7m > div.css-s4sfla > div:nth-child(1) > div.css-s9gj39 > div.css-w8rmc6 > span').innerText
    } else {
        asset = document.querySelector('#__APP > div > div > div.css-e4zj7m > div > div.css-1cjqw9n > div.css-17gt9am > div.css-vurnku > div:nth-child(1) > div > div.css-yvo0m7 > span').innerText
    }

    chrome.runtime.sendMessage({message:prc, asset:asset})
    
    /*
    if (inc === 10) {
        console.log(prc)
        inc = 0
    }
    */
    
    setTimeout(function(){
       price.onclick()
    }, sleeptime)
}  
 
price.onclick()



chrome.runtime.onMessage.addListener((msg, sender, resp) => {
    console.log("order: ", msg.message)
    console.log("asset: ", msg.asset)
    

    if (msg.message === "open") {
        if (window.location.href.endsWith('perpetual')) {
            // sell in futuer marcket
            total = document.querySelector("#FormRow-normal-quantity")
            total.value = msg.asset
            console.log("opening deal with: ", msg.asset )

            // marcket is a button to sell
            btnMarcket = document.querySelector('#__APP > div > div > div > div.css-e4zj7m > div.css-s4sfla > div:nth-child(1) > div.css-na6azx > span.css-191wvd7').click()
            btnMarcket.click()

            // open deal by sell order
            let btnBuy = document.querySelector('#__APP > div > div > div > div.css-e4zj7m > div.css-s4sfla > div:nth-child(1) > form > div.css-f4auaq > button.css-15rehdy')
            btnBuy.click()

            //document.querySelector('button.css-y7ysid').click()
            // TODO procidure all contract staps
        }

        if (!window.location.href.endsWith('perpetual')) {
            // buy in spot marcket
            let total = document.querySelector('#FormRow-BUY-total')
            total.value = msg.asset
            console.log("opening deal with: ", msg.asset )

            let marcket = document.querySelector('#__APP > div > div > div.css-e4zj7m > div > div.css-1cjqw9n > div.css-17gt9am > div.css-vurnku > div:nth-child(1) > div > div.css-8smnea > span.css-191wvd7')
            marcket.click()
            //document.querySelector('#orderformBuyBtn').click()
        }

    }
     
    if (msg.message === "close") {
        if (window.location.href.endsWith('perpetual')) {
            // close in futuer marcket (buy)
            let closeFutur = document.querySelector('#__APP > div > div > div > div.react-grid-layout.layout > div:nth-child(2) > div > div > div > div.css-im6ko3 > div > div > div > div > div.list-container.css-wr25is > div.list-auto-sizer > div > div > div > div > div.closePosition > div > button')
            closeFutur.click()
            console.log("perpetual deal is closed")

        } 
        

        if (!window.location.href.endsWith('perpetual')){
            // sell
            let marcket = document.querySelector('#__APP > div > div > div.css-e4zj7m > div > div.css-1cjqw9n > div.css-17gt9am > div.css-vurnku > div:nth-child(1) > div > div.css-8smnea > span.css-191wvd7')
            marcket.click()
            
            // definde asset to to sell them
            let assetElement = document.querySelector('#__APP > div > div > div.css-e4zj7m > div > div.css-1cjqw9n > div.css-17gt9am > div.css-vurnku > div:nth-child(2) > div > div.css-yvo0m7 > span')
            sellAsset = parseFloat(assetElement.innerText)

            // fill ammont element by size of asset thit need sell
            let ammontElement = document.querySelector('#FormRow-SELL-quantity')
            ammontElement.value = sellAsset
            
            // click sell button
            let sellBtn = document.querySelector('#orderformSellBtn')
            sellBtn.click()
            console.log("spot deal is closed")

        }
    }

    resp("done") 
})




