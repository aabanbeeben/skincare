// JSON өгөгдлийг татаж авах функц
async function fetchProducts() {
    try {
        const response = await fetch("products.json"); // JSON файлын зам
        if (!response.ok) throw new Error("Өгөгдөл татаж авахад алдаа гарлаа.");
        const data = await response.json(); // JSON өгөгдлийг унших
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// HTML дээр бүтээгдэхүүнүүдийг харуулах
function displayProducts(filteredProducts) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Өмнөх бүтээгдэхүүнүүдийг цэвэрлэх
    if (filteredProducts.length === 0) {
        productList.innerHTML = `<p>Тохирох бүтээгдэхүүн олдсонгүй.</p>`;
        return;
    }
    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Үнэ: ${product.price}₮</p>
            </div>
        `;
        productList.insertAdjacentHTML("beforeend", productCard);
    });
}

// URL параметрийг унших функц
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.get("category") || "",
    };
}

// Шүүлт хийх функц
function applyFilter(products, category) {
    if (!category) {
        displayProducts(products); // Бүх бүтээгдэхүүнүүдийг харуулах
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts); // Шүүсэн бүтээгдэхүүнүүдийг харуулах
    }
}

// Шүүлт хийх товч дээрх үйлдэл
function setupFilter(products) {
    const filterDropdown = document.getElementById("filter");
    const applyFilterButton = document.getElementById("apply-filter");

    // Шүүлт хийх товчийг дарсан үед
    applyFilterButton.addEventListener("click", () => {
        const selectedCategory = filterDropdown.value; // Сонгосон категори
        const newURL = `?category=${selectedCategory}`;
        window.history.pushState({}, "", newURL); // URL-ийг шинэчлэх
        applyFilter(products, selectedCategory); // Бүтээгдэхүүнүүдийг шүүх
    });
}

// Эхлэх үед JSON өгөгдлийг уншиж, шүүлт хийх
async function init() {
    const products = await fetchProducts(); // JSON өгөгдлийг татах
    const { category } = getURLParams();
    if (category) {
        document.getElementById("filter").value = category; // URL-ийн категори сонгогдсон байлгах
    }
    applyFilter(products, category); // URL-ийн параметрээр шүүх
    setupFilter(products); // Шүүлтийн үйлдлийг тохируулах
}

// Кодыг эхлүүлэх
init();
