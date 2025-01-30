class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.products = [];
    }

    set products(value) {
        this._products = value;
        this.render();
    }

    get products() {
        return this._products;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .product {
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin: 10px;
                }
            </style>
            <div class="product-list">
                ${this.products.map(product => `
                    <div class="product">
                        <h3>${product.name}</h3>
                        <p>${product.price}₮</p>
                        <button class="add-to-cart">Сагслах</button>
                    </div>
                `).join('')}
            </div>
        `;

        this.shadowRoot.querySelectorAll('.add-to-cart').forEach((button, index) => {
            button.addEventListener('click', () => {
                const event = new CustomEvent('add-to-cart', {
                    detail: this.products[index]
                });
                this.dispatchEvent(event);
            });
        });
    }
}

customElements.define('product-list', ProductList);