document.querySelector("#credentials").addEventListener("click",function(e){
    e.preventDefault()
    let form=document.querySelector(".hiddenform")
    form.classList.toggle("hidden")
})