document.getElementById('submit-comment').addEventListener('click', function () {
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('comment-list');

    const commentText = commentInput.value.trim();
    if (commentText) {
        const newComment = document.createElement('li');
        newComment.textContent = commentText;
        commentList.appendChild(newComment);

        // Сэтгэгдлийг Local Storage-д хадгалах
        const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
        savedComments.push(commentText);
        localStorage.setItem('comments', JSON.stringify(savedComments));

        commentInput.value = ''; // Талбарыг цэвэрлэх
    } else {
        alert('Сэтгэгдлээ оруулна уу!');
    }
});

// Local Storage-оос сэтгэгдлийг унших
window.addEventListener('load', function () {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentList = document.getElementById('comment-list');
    savedComments.forEach(comment => {
        const newComment = document.createElement('li');
        newComment.textContent = comment;
        commentList.appendChild(newComment);
    });
});
