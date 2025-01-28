document.addEventListener("DOMContentLoaded", loadProducts);

document.getElementById("add-product").addEventListener("click", function () {
    let name = document.getElementById("product-name").value.trim();
    let price = document.getElementById("product-price").value.trim();
    let category = document.getElementById("product-category").value.trim();
    let image = document.getElementById("product-image").value.trim() || "assets/images/default-product.jpg";

    if (!name || !price || !category) {
        alert("Бүх талбарыг бөглөнө үү!");
        return;
    }

    // 📌 Бүтээгдэхүүний өгөгдлийг FormData хэлбэрээр үүсгэх
    const productData = new FormData();
    productData.append("name", name);
    productData.append("price", price);
    productData.append("category", category);
    productData.append("image", image);

    // 📌 PHP рүү өгөгдөл илгээх
    fetch("saveProducts.php", {
        method: "POST",
        body: productData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Бүтээгдэхүүн амжилттай хадгалагдлаа!");
            loadProducts(); // 🛑 JSON-оос шинэ бүтээгдэхүүн татах
        } else {
            alert("Алдаа гарлаа: " + data.message);
        }
    })
    .catch(error => console.error("Алдаа:", error));
});

// 📌 JSON-оос бүтээгдэхүүн татаж, жагсаалт гаргах функц
async function loadProducts() {
    try {
        const response = await fetch("assets/js/products.json");
        if (!response.ok) throw new Error("JSON өгөгдлийг татахад алдаа гарлаа.");
        const products = await response.json();

        let productList = document.getElementById("product-list");
        productList.innerHTML = "";

        products.forEach((product, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${product.name} - ${product.price}₮ <button onclick="deleteProduct(${index})">Устгах</button>`;
            productList.appendChild(li);
        });
    } catch (error) {
        console.error("Алдаа:", error);
    }
}

// 📌 Бүтээгдэхүүн устгах функц
function deleteProduct(index) {
    fetch("deleteProduct.php?index=" + index, { method: "GET" })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Бүтээгдэхүүн устгагдлаа!");
            loadProducts();
        } else {
            alert("Устгах үед алдаа гарлаа.");
        }
    })
    .catch(error => console.error("Алдаа:", error));
}
