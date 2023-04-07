let togglewithCredentials = document.querySelector("#credentials")
togglewithCredentials && togglewithCredentials.addEventListener("click", function (e) {
    e.preventDefault()
    let form = document.querySelector(".hiddenform")
    form.classList.toggle("hidden")
    const formClasses = form.classList;

    Array.from(formClasses).length == 2 ? togglewithCredentials.innerText = "Or, Signup with cedentials." : togglewithCredentials.innerText = "Close Form"

})

const challengeDateElem = document.querySelector("#date")
challengeDateElem &&  challengeDateElem.setAttribute("min", new Date().toISOString().split("T")[0])


const dobElem = document.querySelector("#userDOB")
dobElem && dobElem.setAttribute("max", new Date('01-01-2010').toISOString().split("T")[0])

