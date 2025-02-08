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
    setupRemoveButtons();
}
function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll(".remove-from-cart");
    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            removeFromCart(index);
        });
    });
}
function removeFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCartItems();
}
document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
    const checkoutBtn = document.getElementById("checkout-btn");
    const paymentMethods = document.getElementById("payment-methods");
    const confirmPaymentBtn = document.getElementById("confirm-payment");
    const closePaymentBtn = document.getElementById("close-payment");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            paymentMethods.style.display = "block"; 
        });
    }
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener("click", () => {
            alert("Төлбөр амжилттай хийгдлээ!");
            paymentMethods.style.display = "none";
        });
    }
    if (closePaymentBtn) {
        closePaymentBtn.addEventListener("click", () => {
            paymentMethods.style.display = "none";
        });
    }
    
    window.addEventListener("click", (event) => {
        if (event.target === paymentMethods) {
            paymentMethods.style.display = "none";
        }
    });
});
