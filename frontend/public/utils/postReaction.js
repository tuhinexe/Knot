async function likePost(event, postId, currentLike, currentDisLike, userId) {
  event.preventDefault();
  try {
    await fetch(`/api/v1/post/upvote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        upvotes: currentLike,
        downvotes: currentDisLike,
        userId: userId,
      }),
    });
  } catch (err) {
    return;
  }
}

async function dislikePost(event, postId, currentLike, currentDisLike, userId) {
  event.preventDefault();
  try {
    await fetch(`/api/v1/post/downvote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        upvotes: currentLike,
        downvotes: currentDisLike,
        userId: userId,
      }),
    });
  } catch (err) {
    return;
  }
}

export { likePost, dislikePost };
