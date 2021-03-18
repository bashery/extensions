
let url = window.location.href 
console.log("content injected riyht now into ", url);

let sleeptime = 1000
let plus = 0
if (url === "https://gowebexamples.com/http-server/") {
    plus = 3
}
function send() {
    chrome.runtime.sendMessage({message:Math.floor((Math.random() * 10))}, (msg) => {
         console.log("msg from background: ", msg)
    })
    
    setTimeout(function(){
        send()
    }, sleeptime+plus)
}
send()


chrome.runtime.onMessage.addListener((msg, sender, resp) => {
    console.log(msg.message)
    resp("done from:") 
})

