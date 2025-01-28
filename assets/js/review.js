// Сэтгэгдэл илгээх товч дээр дарсан үйлдэл
document.getElementById('submit-comment').addEventListener('click', function () {
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('comment-list');

    const commentText = commentInput.value.trim(); // Оруулсан текстийг авах
    if (commentText) {
        // Шинэ сэтгэгдлийг HTML жагсаалтад нэмэх
        const newComment = document.createElement('li');
        newComment.textContent = commentText;
        commentList.appendChild(newComment);

        // Сэтгэгдлийг Local Storage-д хадгалах
        const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
        savedComments.push(commentText);
        localStorage.setItem('comments', JSON.stringify(savedComments));

        // Сэтгэгдлийн талбарыг цэвэрлэх
        commentInput.value = '';
    } else {
        alert('Сэтгэгдлээ оруулна уу!');
    }
});

// Local Storage-оос хадгалагдсан сэтгэгдлийг унших
window.addEventListener('load', function () {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentList = document.getElementById('comment-list');
    savedComments.forEach(comment => {
        const newComment = document.createElement('li');
        newComment.textContent = comment;
        commentList.appendChild(newComment);
    });
});
