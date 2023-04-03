import { globalEvent } from "../utils/eventListener.js";

async function voteCount(e) {
    e.preventDefault();

    e.target.parentElement.classList.add("voted");
    Array.from(e.target.parentElement.parentElement.children).forEach((child) => {
        child.parentElement.classList.add("pointer-events");
        child.children[1].classList.remove("hide");
    })

    e.target.parentElement.children[1].innerText = Number(e.target.parentElement.children[1].innerText) + 1;

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
//i removed the code below and replaced it with inline ejs check for voted class

// let allOptions = document.querySelectorAll(".option");
// allOptions.forEach(function (option) {
//     if (option.classList.contains("voted")) {
//         option.parentElement.classList.add("pointer-events");
//         Array.from(option.parentElement.children).forEach((child) => {
//             child.children[1].classList.remove("hide");
//         })
//     }
// });

globalEvent("click", ".option", voteCount);
