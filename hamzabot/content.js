//console.log("hello Geany plugin")
//alert("hello world this is geany plugin")
chrome.runtime.onMessage.addListener(function(request,  sender, sendResponse) {
    //alert("reseved this : "+request)
    const re = new RegExp('coin', 'gi')
    const matches = document.documentElement.innerHTML.match(re)
    console.log(matches.length)

    sendResponse({count: matches.length})
})

