class App {
    constructor() {
        this.products = [];
        this.cart = [];
        this.loadProducts();
    }

    async loadProducts() {
        const response = await fetch('https://raw.githubusercontent.com/aabanbeeben/skincare/main/assets/js/products.json');
        this.products = await response.json();
        this.renderProducts();
    }

    renderProducts() {
        const productList = document.querySelector('product-list');
        productList.products = this.products;
    }

    addToCart(product) {
        this.cart.push(product);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
    }

    updateCart() {
        const cartComponent = document.querySelector('cart-component');
        cartComponent.cartItems = this.cart;
    }
}

const app = new App();