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
plus = 0

if (!window.location.href.endsWith("perpetual")) {
    plus = 3
}

let price = document.querySelector('.showPrice')
let prc = 0.0
var bot = false
let inc = 0
price.onclick = function() {
    inc ++

        prc = parseFloat(price.innerText.replace(",", ""))
        chrome.runtime.sendMessage({message:prc})

    if (inc === 10) {
        console.log(prc)
        inc = 0
    }
    setTimeout(function(){
       price.onclick()
    }, sleeptime+plus)
}  
 
price.onclick()





chrome.runtime.onMessage.addListener((msg, sender, resp) => {
    console.log(msg.message)
    

    if (msg.message === "open deal") {
        if (window.location.href.endsWith('perpetual')) {
            // sell in futuer marcket
            document.querySelector('button.css-y7ysid').click()
        }

        if (window.location.href.endsWith('basic')) {
            // buy in spot marcket
            document.querySelector('#orderformBuyBtn').click()
        }

    }
     
    if (msg.message === "close deal") {
        if (window.location.href.endsWith('perpetual')) {
            // buy in futuer marcket
            document.querySelector('button.css-1ftari0').click()
        } 
        if (window.location.href.endsWith('basic')){
            // sell
            document.querySelector('#orderformSellBtn').click()
        }

    }
    

    resp("done") 
})




