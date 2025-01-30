// JSON өгөгдлийг татаж авах функц
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

// HTML дээр бүтээгдэхүүнүүдийг харуулах функц
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; 
    if (products.length === 0) {
        productList.innerHTML = "<p>Тохирох бүтээгдэхүүн олдсонгүй.</p>";
        return;
    }
    products.forEach(product => {
        const productCard = `
            <div class="product-card" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Үнэ: ${product.price}₮</p>
                <button class="add-to-cart" data-id="${product.id}">Сагслах</button>
            </div>
        `;
        productList.insertAdjacentHTML("beforeend", productCard);
    });

    setupAddToCartButtons(products);
}

// Сагслах товчлуурыг тохируулах функц
function setupAddToCartButtons(products) {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault(); 

            const productId = e.target.dataset.id;

            const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

            const selectedProduct = products.find(p => p.id == productId);

            if (!selectedProduct) {
                alert("Бүтээгдэхүүн олдсонгүй!");
                return;
            }

            const existingProduct = cartItems.find(item => item.id == productId);
            if (existingProduct) {
                alert("Энэ бүтээгдэхүүн аль хэдийн сагсанд байна!");
            } else {
                cartItems.push(selectedProduct);
                localStorage.setItem("cart", JSON.stringify(cartItems));
                alert("Бүтээгдэхүүн амжилттай сагсанд нэмэгдлээ!");

                // Сагс хуудас руу шилжих
                window.location.href = "cart.html";
            }
        });
    });
}
// products.html хуудасны JavaScript код
document.addEventListener('DOMContentLoaded', function () {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');

    if (products.length === 0) {
        productList.innerHTML = '<p>Барааны жагсаалт хоосон байна.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Үнэ: ${product.price}₮</p>
                <p>Ангилал: ${product.category}</p>
                <button class="add-to-cart" data-id="${product.id}">Сагслах</button>
            </div>
        `;
        productList.insertAdjacentHTML('beforeend', productCard);
    });
});

// URL шүүлт
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.get("category") || ""
    };
}

// Шүүлт хийх
function applyFilter(products, category) {
    const filteredProducts = category
        ? products.filter(product => product.category === category)
        : products;

    displayProducts(filteredProducts);
}

// Товчлуураар шүүлт хийх
function setupFilter(products) {
    const filterDropdown = document.getElementById("filter");
    const applyFilterButton = document.getElementById("apply-filter");

    applyFilterButton.addEventListener("click", () => {
        const selectedCategory = filterDropdown.value;
        const newURL = `?category=${selectedCategory}`;
        window.history.pushState({}, "", newURL);

        applyFilter(products, selectedCategory);
    });
}

// Програм эхлүүлэх
async function init() {
    const products = await fetchProducts(); // JSON өгөгдлийг татах
    const { category } = getURLParams();

    if (category) {
        document.getElementById("filter").value = category; // Сонгосон утгыг хадгалах
    }

    applyFilter(products, category); // Шүүлт
    setupFilter(products); // Товчийг тохируулах
    setupAddToCartButtons(products); // Сагслах товчлуурыг тохируулах
}

// DOM бүрэн ачаалагдсаны дараа програмыг эхлүүлэх
document.addEventListener("DOMContentLoaded", init);