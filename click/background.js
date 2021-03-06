

let developer = {name:String, id:Number}
let school = {name:String, id:Number}

chrome.tabs.query({}, function(tabs){
        tabs.forEach(tab => {
            if (tab.url.startsWith("https://www.w3schools.com") ) {
                school.name = tab.url
                school.id = tab.id
                
            }

            if (tab.url.startsWith("https://developer")) {
                developer.name = tab.url
                developer.id = tab.id
                //chrome.tabs.sendMessage(tb.id, { action: "xxx" });
                chrome.tabs.executeScript(null, {file:"content.js"}, () => {
                    console.log("inject content.js into ", tab.id, tab.index, tab.url)
                })
            }
        });
});
console.log("developer:", developer)
console.log("school:", school)

//chrome.tabs.onActivated.addListener(tab => {
//    chrome.tabs.get( tab.tabId, tabInfo => {
//        console.log("id:",tab.tabId,"\nurl:",tabInfo.url, "\nidnex:",tabInfo.index)
//    })
//})

//chrome.tabs.executeScript(null, {file:"./content.js"}, console.log("inject content.js file.from background"))




