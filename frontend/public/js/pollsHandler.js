import { globalEvent } from "../utils/eventListener.js";

async function voteCount(e) {
    const clickedOption=e.target
    
    console.log("clicked")
}



globalEvent("click",".option",voteCount);
