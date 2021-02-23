consol.log("hello from forground")
chrome.tabs.executescript(null, {file: "./forground"}, ()=> console.log("injecte a malware"))
