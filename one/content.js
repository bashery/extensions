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
    prc = parseFloat(price.innerText) //  replace(",", "")) updated
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

            
            // select marcket pricw option
            //btnMarcketPrice = document.querySelector('#__APP > div > div > div > div.css-e4zj7m > div.css-s4sfla > div:nth-child(1) > div.css-na6azx > span.css-191wvd7')
            //btnMarcketPrice.click()

            // open deal by sell order
            let btnSell = document.querySelector('#__APP > div > div > div > div.css-e4zj7m > div.css-s4sfla > div:nth-child(1) > form > div.css-f4auaq > button.css-15rehdy')

            btnSell.click()
            resp("opening deal with: "+msg.asset )

            //document.querySelector('button.css-y7ysid').click()
            // TODO procidure all contract staps
        }

        if (!window.location.href.endsWith('perpetual')) {
            // buy in spot marcket
            let total = document.querySelector('#FormRow-BUY-total')
            total.value = msg.asset
            console.log("opening deal with: ", msg.asset )

            // TODO make select marcket price automatic. fix this problem
            //let marcket = document.querySelector('#__APP > div > div > div.css-e4zj7m > div > div.css-1cjqw9n > div.css-17gt9am > div.css-vurnku > div:nth-child(1) > div > div.css-8smnea > span.css-191wvd7')
            //marcket.click()
            //document.querySelector('#orderformBuyBtn').click()
            
            let sellSide = document.querySelector('#__APP > div > div > div.css-e4zj7m > div > div.css-1cjqw9n > div.css-17gt9am > div.css-cfem3r > span.tab-item.css-181qoj4')
            sellSide.click()
            
            let buyBtn = document.querySelector('#orderformBuyBtn')
            buyBtn.click()

           // TODO handle any error with callback 
            resp("done") 


        }

    }
     
    if (msg.message === "close") {
        if (window.location.href.endsWith('perpetual')) {
            // close in futuer marcket (buy)
            let closeFutur = document.querySelector('#__APP > div > div > div > div.react-grid-layout.layout > div:nth-child(2) > div > div > div > div.css-im6ko3 > div > div > div > div > div.list-container.css-wr25is > div.list-auto-sizer > div > div > div > div > div.closePosition > div > button')
            
            closeFutur.click()
            console.log("perpetual deal is closed")
            resp("close perpetual deal")

        } 
        

        if (!window.location.href.endsWith('perpetual')){
            
            // select sell side setting
            let sellSide = document.querySelector('#__APP > div > div > div.css-e4zj7m > div > div.css-1cjqw9n > div.css-17gt9am > div.css-cfem3r > span.tab-item.css-181qoj4')
            sellSide.click()


            // select marcket price option
            //let marcket = document.querySelector('#__APP > div > div > div.css-e4zj7m > div > div.css-1cjqw9n > div.css-17gt9am > div.css-vurnku > div:nth-child(1) > div > div.css-8smnea > span.css-191wvd7')
            //marcket.click()

            
            // definde asset to to sell them
            let assetElement = document.querySelector('#__APP > div > div > div.css-e4zj7m > div > div > div.css-17gt9am > div.css-vurnku > div:nth-child(2) > div > div.css-yvo0m7 > span')
            sellAsset = parseFloat(assetElement.innerText)

            
            // fill ammont element by size of asset thit need sell
            let ammontElement = document.querySelector('#FormRow-SELL-quantity')
            

            // definde fix foot withowt around function:
            function floorFigure(figure, decimals){
                if (!decimals) decimals = 2;
                var d = Math.pow(10,decimals);
                return (parseInt(figure*d)/d).toFixed(decimals);
            };

            ammontElement.value = floorFigure(sellAsset, 1)
            
            // click sell button
            let sellBtn = document.querySelector('#orderformSellBtn')
            sellBtn.click()
            console.log("spot deal is closed")
            
            // TODO respons result done or failure to for handling errors
            resp("done")

        }
    }

    resp("done") 
})




