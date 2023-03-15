import { likePost, dislikePost } from "../utils/postReaction.js";
import { globalEvent } from "../utils/eventListener.js";
async function likePostEvent(e) {
  if (Array.from(e.target.parentElement.classList).includes("liked")) {
    console.log("already liked");
    return;
  }
  const postId =
    e.target.parentElement.parentElement.getAttribute("data-post-id");
  const currentLike =
    e.target.parentElement.parentElement.getAttribute("data-upvotes");
  const currentDisLike =
    e.target.parentElement.parentElement.getAttribute("data-downvotes");
  const userId =
    e.target.parentElement.parentElement.getAttribute("data-user-id");
    if (e.target.classList.length > 0) {
      e.target.classList.toggle("bxs-upvote");
      let upvoteCount = document.querySelector("#upvote-count");
      let downvoteCount = document.querySelector("#downvote-count");
      let downCount = Number(downvoteCount.innerText);
      let count = Number(upvoteCount.innerText);
      upvoteCount.innerText = String(count + 1);
      downCount > 0 ? (downvoteCount.innerText = String(downCount - 1)) : null;
    } else {
      return
    }
  e.target.parentElement.classList.add("liked");
  e.target.parentElement.nextElementSibling.firstElementChild.classList.remove(
    "bxs-downvote"
  );
  e.target.parentElement.nextElementSibling.classList.remove("disliked");
  e.target.parentElement.nextElementSibling.firstElementChild.classList.add(
    "bx-downvote"
  );
  await likePost(e, postId, currentLike, currentDisLike, userId);
}

async function dislikePostEvent(e) {
  if (Array.from(e.target.parentElement.classList).includes("disliked")) {
    console.log("already disliked");
    return;
  }
  const postId =
    e.target.parentElement.parentElement.getAttribute("data-post-id");
  const currentLike =
    e.target.parentElement.parentElement.getAttribute("data-upvotes");
  const currentDisLike =
    e.target.parentElement.parentElement.getAttribute("data-downvotes");
  const userId =
    e.target.parentElement.parentElement.getAttribute("data-user-id");
    if (e.target.classList.length > 0) {
      e.target.classList.toggle("bxs-downvote");
      let upvoteCount = document.querySelector("#upvote-count");
      let downvoteCount = document.querySelector("#downvote-count");
      let downCount = Number(downvoteCount.innerText);
      let count = Number(upvoteCount.innerText);
      count > 0 ? (upvoteCount.innerText = String(count - 1)) : null;
      downvoteCount.innerText = String(downCount + 1);
    } else {
      return
    }
  e.target.parentElement.classList.add("disliked");
  e.target.parentElement.previousElementSibling.firstElementChild.classList.remove(
    "bxs-upvote"
  );
  e.target.parentElement.previousElementSibling.classList.remove("liked");
  e.target.parentElement.previousElementSibling.firstElementChild.classList.add(
    "bx-upvote"
  );
  await dislikePost(e, postId, currentLike, currentDisLike, userId);
}

globalEvent("click", ".like", likePostEvent);
globalEvent("click", ".dislike", dislikePostEvent);
