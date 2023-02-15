// import GlobalEvenListener from ("../utils/eventListener.js");

let likeButton = document.getElementById("likeButton");
let dislikeButton = document.getElementById("dislikeButton");

likeButton.addEventListener("click", likePost);
dislikeButton.addEventListener("click", dislikePost);

async function likePost(e) {
  e.preventDefault();
  const postId = document.getElementById("likeButton").dataset.postid;
  const currentLike = document.getElementById("likeButton").dataset.upvotes;
  const currentDisLike = document.getElementById("likeButton").dataset.downvotes;
  await fetch(`http://localhost/devapi/upvote`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId: postId, upvotes: currentLike, downvotes: currentDisLike }),
  });
};

async function dislikePost(e) {
  e.preventDefault();
  const postId = document.getElementById("dislikeButton").dataset.postid;
  const currentLike = document.getElementById("likeButton").dataset.upvotes;
  const currentDisLike = document.getElementById("dislikeButton").dataset.downvotes;
  await fetch(`http://localhost/devapi/downvote`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId: postId, upvotes: currentLike, downvotes: currentDisLike }),
  });
};