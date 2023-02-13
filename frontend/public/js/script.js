let togglewithCredentials = document.querySelector("#credentials")
togglewithCredentials.addEventListener("click", function (e) {
    e.preventDefault()
    let form = document.querySelector(".hiddenform")
    form.classList.toggle("hidden")
    const formClasses = form.classList;

    Array.from(formClasses).length == 2 ? togglewithCredentials.innerText = "Or, Signup with cedentials." : togglewithCredentials.innerText = "Close Form"

})
