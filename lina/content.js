
let Btn = document.createElement('button')
Btn.innerText = "run bot"
document.querySelector('header').appendChild(Btn)

console.log("injected")

sleeptime = 1000
plus = 0

if (window.location.href === "https://www.binance.com/en/trade/LINA_USDT?layout=basic") {
    plus = 3
}


let price = document.querySelector('.showPrice')
let prc = 0.0
var bot = false

price.onclick = function() {
    if (bot) {

        prc = parseFloat(price.innerText.replace(",", ""))
        console.log(prc)
        chrome.runtime.sendMessage({message:prc})

        setTimeout(function(){
            price.onclick()
        }, sleeptime+plus)
    }
}  
 
Btn.onclick = function() {
    if (!bot) {
        bot = true
        Btn.innerText = "Stop"
        price.onclick()
        console.log("bot on")
    } else {
        bot = false 
        Btn.innerText = "Start"
        console.log("bot off")
    }
}







chrome.runtime.onMessage.addListener((msg, sender, resp) => {
    console.log(msg.message)
    resp("done") 
})




function send() {
    let randomNum = Math.floor((Math.random() * 10))
    //chrome.runtime.sendMessage({message:randomNum}, () => {})
    chrome.runtime.sendMessage({message:randomNum})
    
    setTimeout(function(){
        send()
    }, sleeptime+plus)
}
//send()


