// admin.js
document.getElementById('add-product').addEventListener('click', function () {
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productCategory = document.getElementById('product-category').value;
    const productImage = document.getElementById('product-image').value;

    if (productName && productPrice && productCategory && productImage) {
        const newProduct = {
            id: Date.now(), // Уникаль ID үүсгэх
            name: productName,
            price: productPrice,
            category: productCategory,
            image: productImage
        };

        // Local Storage-д хадгалах
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        // Барааны жагсаалтыг шинэчлэх
        displayProducts();
        alert('Бараа амжилттай нэмэгдлээ!');
    } else {
        alert('Бүх талбарыг бөглөнө үү!');
    }
});

// Барааны жагсаалтыг харуулах
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${product.name}</strong> - ${product.price}₮ (${product.category})
            <img src="${product.image}" alt="${product.name}" width="50">
        `;
        productList.appendChild(li);
    });
}

// Дом ачаалагдсан үед барааны жагсаалтыг харуулах
document.addEventListener('DOMContentLoaded', displayProducts);