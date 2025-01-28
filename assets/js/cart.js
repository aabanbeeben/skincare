function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Таны сагс хоосон байна.</p>";
        return;
    }

    cartItems.forEach(item => {
        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-image">
                <div>
                    <h3>${item.name}</h3>
                    <p>Үнэ: ${item.price}₮</p>
                </div>
            </div>
        `;
        cartContainer.insertAdjacentHTML("beforeend", cartItem);
    });
}

// Програм эхлүүлэх
displayCartItems();
