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

    setupAddToCartButtons();
   
}
function setupAddToCartButtons(products) {
    function setupAddToCartButtons() {
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
    
                    window.location.href = "cart.html";
                }
            });
        });
    }
    
}

// Програм эхлүүлэх
async function init() {
    const products = await fetchProducts(); 
    const { category } = getURLParams();

    if (category) {
        document.getElementById("filter").value = category; 
    }

    applyFilter(products, category); 
    setupFilter(products); 
    setupAddToCartButtons(products); 
}

init();

document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            let productContainer = document.getElementById("product-container");
            productContainer.innerHTML = "";

            if (products.length === 0) {
                productContainer.innerHTML = "<p>Одоогоор нэмэгдсэн бараа алга.</p>";
                return;
            }

            products.forEach(product => {
                let productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Үнэ: ${product.price}₮</p>
                    <p>Категори: ${product.category}</p>
                    <button class="add-to-cart">Сагслах</button>
                `;

                productContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error("JSON-с бүтээгдэхүүн уншихад алдаа:", error));
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
}

init();
