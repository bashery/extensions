document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("button").addEventListener("click", onclick, false)
    function onclick() {
        btn = document.createElement('button')
        document.querySelector("body").appendChild(btn).addEventListener("click", on1click, false)
        function on1click() {
            alert("hello bot. you clickete second button")
            console.log("hello geany")
        }
    } 
})
