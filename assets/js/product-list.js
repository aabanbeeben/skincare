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