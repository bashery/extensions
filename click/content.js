console.log("content injected riyht now into ", window.location.hostname)

const seter = document.createElement('button')
seter.innerText = 'set data'
seter.id = 'seter'
document.querySelector('body').appendChild(seter)


const geter = document.createElement('button')
geter.innerText = 'get data'
geter.id = 'geter'
document.querySelector('body').appendChild(geter)


