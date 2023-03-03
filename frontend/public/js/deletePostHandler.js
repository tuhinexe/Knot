const deleteBtn = document.querySelector('.delete-icon');

deleteBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const postId = document.querySelector('.interaction').getAttribute('data-post-id');
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
});
