export class Cart {
    constructor() {
        this.items = new Map();
    }

    addToCart(product) {
        if (this.items.has(product.id)) {
            this.items.get(product.id).quantity++;
        } else {
            this.items.set(product.id, { product, quantity: 1 });
        }
    }

    removeFromCart(productId) {
        this.items.delete(productId);
    }

    loadFromLocalStorage() {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            this.items = new Map(savedCart.map(([id, item]) => [Number(id), item]));
        }
    }

    saveToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(Array.from(this.items.entries())));
    }

    getCartItems() {
        return Array.from(this.items.values());
    }

    calculateTotal() {
        return this.getCartItems().reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
}
