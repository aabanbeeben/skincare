// Сагсны бүтээгдэхүүнийг харуулах функц
function displayCartItems() {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
        cartList.innerHTML = "<p>Таны сагс хоосон байна.</p>";
        totalPriceElement.textContent = "Нийт үнэ: 0₮";
        return;
    }

    let totalPrice = 0;
    cartList.innerHTML = "";

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Үнэ: ${item.price}₮</p>
            <button class="remove-from-cart" data-index="${index}">Устгах</button>
        `;

        cartList.appendChild(cartItem);
        totalPrice += parseFloat(item.price);
    });

    totalPriceElement.textContent = `Нийт үнэ: ${totalPrice}₮`;

    // Устгах товчлуурыг тохируулах
    setupRemoveButtons();
}

// Устгах товчлуурыг тохируулах функц
function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll(".remove-from-cart");

    removeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            removeFromCart(index);
        });
    });
}

// Сагснаас бүтээгдэхүүнийг устгах функц
function removeFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1); // Тухайн индекстэй бүтээгдэхүүнийг устгах
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Сагсны жагсаалтыг шинэчлэх
    displayCartItems();
}

// DOM бүрэн ачаалагдсаны дараа сагсны жагсаалтыг харуулах
document.addEventListener("DOMContentLoaded", displayCartItems);

document.addEventListener("DOMContentLoaded", function () {
    const checkoutBtn = document.getElementById("checkout-btn");
    const paymentModal = document.getElementById("payment-modal");
    const closeModal = document.querySelector(".close");
    const paymentOptions = document.querySelectorAll(".payment-option");

    // Төлбөрийн модалыг нээх
    checkoutBtn.addEventListener("click", function () {
        paymentModal.style.display = "block";
    });

    // Төлбөрийн модалыг хаах
    closeModal.addEventListener("click", function () {
        paymentModal.style.display = "none";
    });

    // Гадна дарахад хаах
    window.addEventListener("click", function (event) {
        if (event.target === paymentModal) {
            paymentModal.style.display = "none";
        }
    });

    // Төлбөрийн хэрэгсэл сонгох үед
    paymentOptions.forEach(option => {
        option.addEventListener("click", function () {
            const method = this.dataset.method;
            alert(method + " аргыг сонголоо. Тун удахгүй дэмжигдэх болно!");
            paymentModal.style.display = "none";
        });
    });
});
