

document.querySelector("button").addEventListener("click", onclick, false)
function onclick() {
    chrome.tabs.query({currentWindow:true, active:true}, 
        function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'hello !', show(tabs))
        })
} 
function show(tabs) {
    alert("all tabs is "+ tabs.length)
    console.log(typeof(tabs))
}
function setCount(res) {
    let div = document.createElement("div")
    div.textContent = `${res.count} coins`
    document.body.appendChild(div)
}



//document.addEventListener("DOMContentLoaded", function() {
//})


