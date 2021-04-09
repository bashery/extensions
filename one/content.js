sleeptime = 1000
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
    console.log(msg.message)
    resp("done") 
})




