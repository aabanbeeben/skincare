// JSON өгөгдлийг татаж авах функц
async function fetchProducts() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/aabanbeeben/skincare/refs/heads/main/html/products.json?token=GHSAT0AAAAAAC54ANYSFVO2WT2LTAFFQIHWZ4XJ3ZQ");
        if (!response.ok) {
            throw new Error("JSON өгөгдлийг татахад алдаа гарлаа.");
        }
        return await response.json(); // JSON өгөгдлийг буцаана
    } catch (error) {
        console.error("Алдаа:", error);
        return []; // Алдаа гарсан тохиолдолд хоосон массив буцаана
    }
}


// HTML дээр бүтээгдэхүүнүүдийг харуулах функц
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Хуучин бүтээгдэхүүнүүдийг арилгах

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
            </div>
        `;
        productList.insertAdjacentHTML("beforeend", productCard);
    });
}

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
