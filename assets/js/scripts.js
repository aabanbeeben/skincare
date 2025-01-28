// JSON өгөгдлийг татаж авах функц
async function fetchProducts() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/aabanbeeben/skincare/refs/heads/main/assets/js/products.json");
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
                e.preventDefault(); // Default үйлдлийг болиулах
    
                const productId = e.target.dataset.id;
    
                // Одоогийн сагсны өгөгдлийг localStorage-оос авах
                const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
                // JSON өгөгдлөөс сонгосон бүтээгдэхүүнийг олох
                const selectedProduct = products.find(p => p.id == productId);
    
                if (!selectedProduct) {
                    alert("Бүтээгдэхүүн олдсонгүй!");
                    return;
                }
    
                // Сагсанд байгаа эсэхийг шалгах
                const existingProduct = cartItems.find(item => item.id == productId);
                if (existingProduct) {
                    alert("Энэ бүтээгдэхүүн аль хэдийн сагсанд байна!");
                } else {
                    // Сагсанд бүтээгдэхүүнийг нэмэх
                    cartItems.push(selectedProduct);
                    localStorage.setItem("cart", JSON.stringify(cartItems));
                    alert("Бүтээгдэхүүн амжилттай сагсанд нэмэгдлээ!");
    
                    // Сагсны хуудас руу шилжих
                    window.location.href = "cart.html";
                }
            });
        });
    }
    
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
    setupAddToCartButtons(products); // Сагслах товчийг тохируулах
}

init();



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
