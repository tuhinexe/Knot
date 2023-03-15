import { globalEvent } from '../utils/eventListener.js';

const deletePost = async (e) => {
    e.preventDefault();
    const postId = e.target.parentElement.getAttribute('data-post-id');
    const post = await fetch(`/post/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postId: postId,
        })
    });
    if (post.redirected === true) {
        window.location = post.url;
    }
};

globalEvent('click', '.delete-icon', deletePost);
