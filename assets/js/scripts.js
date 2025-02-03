// JSON өгөгдлийг татаж авах
async function fetchProducts() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/aabanbeeben/skincare/refs/heads/main/assets/js/products.json");
        if (!response.ok) throw new Error("JSON өгөгдлийг татахад алдаа гарлаа.");
        return await response.json();
    } catch (error) {
        console.error("Алдаа:", error);
        return [];
    }
}

// Бүтээгдэхүүнүүдийг харуулах
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = products.length === 0 ? "<p>Тохирох бүтээгдэхүүн олдсонгүй.</p>" : "";
    products.forEach(product => {
        productList.insertAdjacentHTML("beforeend", `
            <div class="product-card" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Үнэ: ${product.price}₮</p>
                <button class="add-to-cart" data-id="${product.id}">Сагслах</button>
            </div>
        `);
    });
    setupAddToCartButtons(products);
}

// URL шүүлт
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return { category: params.get("category") || "" };
}

// Шүүлт хийх
function applyFilter(products, category, searchTerm) {
    let filteredProducts = category ? products.filter(p => p.category === category) : products;
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    displayProducts(filteredProducts);
}

// Шүүлтийн тохиргоо
function setupFilter(products) {
    document.getElementById("apply-filter").addEventListener("click", () => {
        const selectedCategory = document.getElementById("filter").value;
        window.history.pushState({}, "", `?category=${selectedCategory}`);
        applyFilter(products, selectedCategory, document.getElementById("search-input").value);
    });
}

// Хайлт хийх тохиргоо
function setupSearch(products) {
    document.getElementById("search-input").addEventListener("input", () => {
        applyFilter(products, document.getElementById("filter").value, document.getElementById("search-input").value);
    });
}

// Програм эхлүүлэх
async function init() {
    const products = await fetchProducts(), { category } = getURLParams();
    if (category) document.getElementById("filter").value = category;
    applyFilter(products, category);
    setupFilter(products);
    setupAddToCartButtons(products);
}

document.addEventListener("DOMContentLoaded", init);

 // Сагслах товчлуурын тохиргоо
function setupAddToCartButtons(products) {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.replaceWith(button.cloneNode(true)); 
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = e.target.dataset.id, cartItems = JSON.parse(localStorage.getItem("cart")) || [],
                  selectedProduct = products.find(p => p.id == productId);
            if (!selectedProduct) return alert("Бүтээгдэхүүн олдсонгүй!");
            if (cartItems.some(item => item.id == productId)) return alert("Энэ бүтээгдэхүүн сагсанд байна!");
            cartItems.push(selectedProduct);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            alert("Бүтээгдэхүүн сагсанд нэмэгдлээ!");
            window.location.href = "cart.html";
        });
    });
}

