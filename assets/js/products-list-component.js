class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._products = [];
    }
    set products(value) {
        this._products = value;
        this.render();
    }
    get products() {
        return this._products;
    }
    render() {
        this.shadowRoot.innerHTML = this.products.length
            ? this.products
                  .map(
                      (product) => `
                <div class="product-card" data-category="${product.category}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Үнэ: ${product.price}₮</p>
                    <button class="add-to-cart" data-id="${product.id}">Сагслах</button>
                </div>
            `
                  )
                  .join("")
            : "<p>Тохирох бүтээгдэхүүн олдсонгүй.</p>";
        this.shadowRoot.querySelectorAll(".add-to-cart").forEach((button, index) => {
            button.addEventListener("click", () => {
                this.dispatchEvent(new CustomEvent("add-to-cart", { detail: this.products[index], bubbles: true }));
            });
        });
    }
}
customElements.define("product-list", ProductList);