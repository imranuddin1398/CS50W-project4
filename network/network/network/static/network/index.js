function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function likeHandler(postId, whoYouLiked) {
    const btn = document.getElementById(postId);
    const likeCountElement = document.getElementById(`like-count-${postId}`);
    let liked = whoYouLiked.includes(postId);

    fetch(liked ? `/remove_like/${postId}` : `/add_like/${postId}`, {
        method: 'POST',
        headers: {"Content-type": "application/json", "X-CSRFToken": getCookie("csrftoken")}
    })
    .then(response => response.json())
    .then(result => {
        if (liked) {
            btn.classList.remove('fa-thumbs-down');
            btn.classList.add('fa-thumbs-up');
            whoYouLiked = whoYouLiked.filter(id => id !== postId);
        } else {
            btn.classList.remove('fa-thumbs-up');
            btn.classList.add('fa-thumbs-down');
            whoYouLiked.push(postId);
        }
        likeCountElement.textContent = result.new_like_count; // Update like count
    });
}
