let togglewithCredentials = document.querySelector("#credentials")
togglewithCredentials && togglewithCredentials.addEventListener("click", function (e) {
    e.preventDefault()
    let form = document.querySelector(".hiddenform")
    form.classList.toggle("hidden")
    const formClasses = form.classList;

    Array.from(formClasses).length == 2 ? togglewithCredentials.innerText = "Or, Signup with cedentials." : togglewithCredentials.innerText = "Close Form"

})

const challengeDateElem = document.querySelector("#date")

// set the max date and min date of 7 days

challengeDateElem &&  challengeDateElem.setAttribute("min", new Date().toISOString().split("T")[0])

