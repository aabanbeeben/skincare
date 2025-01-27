import { Product } from "./product.js";
import { Cart } from "./cart.js";
import { fetchProducts } from "./data.js";
import { displayProducts } from "./ui.js";

const cart = new Cart(); // Сагсыг үүсгэх

// Бүтээгдэхүүнүүдийг татаж авах
async function init() {
    const data = await fetchProducts();
    const products = data.map(p => new Product(p.id, p.name, p.category, p.price, p.image));
    displayProducts(products, "product-list");

    // Сагсанд нэмэх товчны үйлдэл
    document.getElementById("product-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart-btn")) {
            const productId = +e.target.dataset.id;
            const product = products.find(p => p.id === productId);
            cart.addToCart(product);
            alert(`${product.name} сагсанд нэмэгдлээ!`);
            cart.saveToLocalStorage(); // Сагсыг хадгалах
        }
    });
}

init();
