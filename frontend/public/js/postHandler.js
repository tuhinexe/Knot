// import GlobalEvenListener from ("../utils/eventListener.js");

let likeButton = document.getElementById("likeButton");


likeButton.addEventListener("click", likePost);

//create a function called likePost
function likePost() {
  console.log("like button clicked");
  //get the id of the post
//   const postId = document.getElementById("post").dataset.postid;
//   console.log(postId);
//   console.log("working");

// //   send a post request to the server
//   fetch(`/post/${postId}/like`, {
//     method: "POST",
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       //update the like count
//       document.getElementById("likeCount").innerHTML = data.likes.length;
//     });
}
