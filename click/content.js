console.log("content injected riyht now into ", window.location.hostname)

const seter = document.createElement('button')
seter.innerText = 'set data'
seter.id = 'seter'
document.querySelector('#topnav').appendChild(seter)

let price = 0
seter.addEventListener('click', ()=> {
    price ++
    chrome.runtime.sendMessage({message:price}, (msg) => {console.log("msg form background is : ", msg)})
    setTimeout(() => {  
        seter.click()
    }, 2000);
})
//chrome.runtime.onMessage.addListener((msg, sender, rep) => {
  //  console.log(msg, sender)
//})

