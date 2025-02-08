class CartComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    }

    set cartItems(value) {
        this._cartItems = value;
        this.render();
    }

    get cartItems() {
        return this._cartItems;
    }

    render() {
        const totalPrice = this.cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .cart-item {
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin: 10px;
                }
            </style>
            <div class="cart">
                <h2>Сагс</h2>
                ${this.cartItems.map(item => `
                    <div class="cart-item">
                        <h3>${item.name}</h3>
                        <p>${item.price}₮</p>
                    </div>
                `).join('')}
                <p>Нийт үнэ: ${totalPrice}₮</p>
            </div>
       
            `;
    }
}
window.addEventListener("click", (event) => {
    if (event.target === paymentMethods) {
        paymentMethods.style.display = "none";
    }
});
customElements.define('cart-component', CartComponent);