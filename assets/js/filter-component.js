class FilterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.getElementById('apply-filter').addEventListener('click', () => {
            const filterValue = this.shadowRoot.getElementById('filter').value;
            const event = new CustomEvent('filter-change', {
                detail: filterValue
            });
            this.dispatchEvent(event);
        });
    }
}

customElements.define('filter-component', FilterComponent);

filter-CompositionEvent.js

class FilterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = 

        this.shadowRoot.getElementById('apply-filter').addEventListener('click', () => {
            const filterValue = this.shadowRoot.getElementById('filter').value;
            const event = new CustomEvent('filter-change', {
                detail: filterValue
            });
            this.dispatchEvent(event);
        });
    }
}

customElements.define('filter-component', FilterComponent);

