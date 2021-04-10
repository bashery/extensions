// control buttons

let btn = document.createElement('button')
//let btn = document.querySelector('start')
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



sleeptime = 400 
plus = 0

if (!window.location.href.endsWith("perpetual")) {
    plus = 3
}

let price = document.querySelector('.showPrice')
let prc = 0.0
var bot = false

price.onclick = function() {

        prc = parseFloat(price.innerText.replace(",", ""))
        console.log(prc)
        chrome.runtime.sendMessage({message:prc})

        setTimeout(function(){
            price.onclick()
        }, sleeptime+plus)
}  
 
price.onclick()





chrome.runtime.onMessage.addListener((msg, sender, resp) => {
    console.log()
    if (msg.message.startWith('buy')) {
       // document.querySelector('#orderformBuyBtn').click()
    }
    
    if (msg.message.startWith('close')) {
        //document.querySelector('#orderformSellBtn').click()

    }
    
    resp("done") 
})




