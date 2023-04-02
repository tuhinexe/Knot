async function likePost(event, postId, currentLike, currentDisLike) {
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
        downvotes: currentDisLike
      }),
    });
  } catch (err) {
    return;
  }
}

async function dislikePost(event, postId, currentLike, currentDisLike) {
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
        downvotes: currentDisLike
      }),
    });
  } catch (err) {
    return;
  }
}

async function sharePost(event, postId, currentShare) {
  event.preventDefault();
  try {
    const res = await fetch(`/api/v1/post/share`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        shares: currentShare,
      }),
    })
    if(res.redirected === true){
      window.location = res.url;
    }
  } catch (err) {
    return;
  }
}

export { likePost, dislikePost, sharePost };
