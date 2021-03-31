console.log("injected")
sleeptime = 1000
plus = 0

if (window.location.href === "https://www.binance.com/en/trade/LINA_USDT?layout=basic") {
    plus = 3
}


let price = document.querySelector('.showPrice')
price.onclick = function() {
    chrome.runtime.sendMessage({message:price.innerText})
    console.log(price.innerText)

    // TODO number(a.replace(",", ""))
    
    setTimeout(function(){
        price.onclick()
    }, sleeptime+plus)
}  
 
price.onclick()


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


