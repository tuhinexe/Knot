import { globalEvent } from '../utils/eventListener.js';

const deletePost = async (e) => {
    e.preventDefault();
    console.log("comment delete");
    const commentId = e.target.parentElement.getAttribute('data-comment-id');
    const postId = e.target.parentElement.getAttribute('data-post-id');
    const post = await fetch(`/post/${postId}/comment`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            commentId: commentId
        })
    });
    if (post.redirected === true) {
        window.location = post.url;
    }
};

globalEvent('click', '.comment-delete-icon', deletePost);
