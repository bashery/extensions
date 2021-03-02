document.addEventListener("DOMContentLoaded", function() {

    const bg = chrome.extension.getBackgroundPage()

    Object.keys(bg.coins).forEach(function(url) {

        const div = document.createElement('div')
        div.textContent = `${url}: ${bg.coins[url]}`
        document.body.appendChild(div)
        console.log("test length"+bg.coins[url])

    })
    



    /* document.querySelector("button").addEventListener("click", onclick, false)
    function onclick() {chrome.tabs.query({currentWindow:true, active:true}, 
        function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'hello !', setCount)
        })
    } 
    function setCount(res) {

        let div = document.createElement("div")
        div.textContent = `${res.count} coins`
        document.body.appendChild(div)
    } */


}, false)


