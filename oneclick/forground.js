
const first = document.createElement('button');
first.innerText = 'set data';
first.id = "first";
document.querySelector('body').appendChild(first)

first.addEventListener('click', () => {
    chrome.storage.local.set({"password":"12345"})
    console.log("i set data riyght now")
})


const second = document.createElement('button');
second.innerText= 'shotout data to backPage';
second.id = "second";

document.querySelector('body').appendChild(second)

second.addEventListener('click', () => {
    chrome.runtime.sendMessage({message: "check the storage"}, (res) => {
        console.log(res)
    });
    console.log("messege is in storage")
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.message)
})
 
