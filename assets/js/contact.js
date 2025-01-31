document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const statusMessage = document.getElementById("status");
    const messagesList = document.getElementById("messages-list");
    const viewMessagesBtn = document.getElementById("view-messages");

    function getMessages() {
        return JSON.parse(localStorage.getItem("contactMessages")) || [];
    }

    function saveMessage(name, email, message) {
        const messages = getMessages();
        messages.push({ name, email, message, date: new Date().toLocaleString() });
        localStorage.setItem("contactMessages", JSON.stringify(messages));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        saveMessage(name, email, message);
        statusMessage.innerText = "Мэдээлэл амжилттай хадгалагдлаа!";
        form.reset(); 
    });

    viewMessagesBtn.addEventListener("click", function () {
        const messages = getMessages();
        messagesList.innerHTML = ""; 

        if (messages.length === 0) {
            messagesList.innerHTML = "<p>Ямар ч мэдээлэл алга.</p>";
            return;
        }

        messages.forEach(msg => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message-item");
            messageDiv.innerHTML = `
                <p><strong>${msg.name}</strong> (${msg.email})</p>
                <p>${msg.message}</p>
                <small>${msg.date}</small>
                <hr>
            `;
            messagesList.appendChild(messageDiv);
        });
    });
});
