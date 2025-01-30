export function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    products.forEach(product => {
        container.insertAdjacentHTML(
            "beforeend",
            `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Үнэ: ${product.price}₮</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Сагсанд нэмэх</button>
            </div>
            `
        );
    });
}

export function updateCartUI(cart, containerId) {
    const container = document.getElementById(containerId);
    const items = cart.getCartItems();
    container.innerHTML = items.map(item => `
        <div class="cart-item">
            <img src="${item.product.image}" alt="${item.product.name}">
            <h3>${item.product.name}</h3>
            <p>Үнэ: ${item.product.price}₮</p>
            <p>Тоо: ${item.quantity}</p>
            <button class="remove-btn" data-id="${item.product.id}">Устгах</button>
        </div>
    `).join("");
    document.getElementById("total-price").textContent = `Нийт үнэ: ${cart.calculateTotal()}₮`;
}
