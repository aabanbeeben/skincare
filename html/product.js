export class Product {
    constructor(id, name, category, price, image) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.image = image;
    }

    createProductCard() {
        return `
            <div class="product-card">
                <img src="${this.image}" alt="${this.name}">
                <h3>${this.name}</h3>
                <p>Үнэ: ${this.price}₮</p>
                <button class="add-to-cart-btn" data-id="${this.id}">Сагсанд нэмэх</button>
            </div>
        `;
    }
}
