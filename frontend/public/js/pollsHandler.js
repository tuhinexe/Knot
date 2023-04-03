import { globalEvent } from "../utils/eventListener.js";

async function voteCount(e) {
    e.preventDefault();

    e.target.parentElement.classList.add("voted");
    Array.from(e.target.parentElement.parentElement.children).forEach((child) => {
        child.parentElement.classList.add("pointer-events");
        child.children[2].classList.remove("hide");
    })

    e.target.parentElement.children[2].innerText = Number(e.target.parentElement.children[2].innerText) + 1;

    const clickedOptionId = e.target.parentElement.getAttribute("data-option-id");
    const pollId = e.target.parentElement.parentElement.getAttribute("data-poll-id");

    try {
        const response = await fetch("/polls/vote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ clickedOptionId, pollId }),

        });
    }
    catch (err) {
        console.log(err)
    }
}

let allOptions = document.querySelectorAll(".option");
allOptions.forEach(function (option) {
    if (option.classList.contains("voted")) {
        option.parentElement.classList.add("pointer-events");
        Array.from(option.parentElement.children).forEach((child) => {
            child.children[2].classList.remove("hide");
        })
    }
});

let  allPolls= document.querySelectorAll(".poll-options");
Array.from(allPolls).forEach((option) => {
    console.log(option.children[0])
})

globalEvent("click", ".option", voteCount);
