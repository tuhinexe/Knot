import { globalEvent } from "../utils/eventListener.js";

async function voteCount(e) {
    e.preventDefault();

    const clickedOptionId=e.target.parentElement.getAttribute("data-option-id");
    const pollId=e.target.parentElement.parentElement.getAttribute("data-poll-id");
    

    try{
        const response = await fetch("/polls/vote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({clickedOptionId,pollId}),

        });
     
        if (response.redirected === true) {
            window.location = response.url;
        }
    }
    catch(err){
        console.log(err)
    }
}

let allOptions = document.querySelectorAll(".option");
allOptions.forEach(function (option) {
    if(option.classList.contains("voted")){
        option.parentElement.classList.add("pointer-events");
        Array.from(option.parentElement.children).forEach((child)=>{
            child.children[1].classList.remove("hide");
        })
    }
});

globalEvent("click",".option", voteCount);
