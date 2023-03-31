import { globalEvent } from "../utils/eventListener.js";

async function voteCount(e) {
    e.preventDefault();
    const clickedOptionId=e.target.parentElement.getAttribute("data-option-id");
    const pollId=e.target.parentElement.parentElement.getAttribute("data-poll-id");

    console.log(clickedOptionId,pollId)
    
    try{
        const response = await fetch("/polls/vote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({clickedOptionId,pollId}),

        });
        console.log(response)
    }
    catch(err){
        console.log(err)
    }
}



globalEvent("click",".option", voteCount);
