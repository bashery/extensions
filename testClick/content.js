
console.log("content injected riyht now into ", window.location.href);

let price = document.querySelector('.showPrice')
price.onclick = function() {
    chrome.runtime.sendMessage({message:price.innerText}, (msg) => {
         console.log("msg from background: ", msg)
    })
    setTimeout(function(){
        price.onclick()
    }, 1000)
}

price.onclick()
    
//chrome.runtime.onMessage.addListener((msg, sender, rep) => {
  //  console.log(msg, sender)
//})

function sleep(milliseconds) {
const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
