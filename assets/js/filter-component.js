class FilterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
            </style>
            <select id="filter">
                <option value="">Бүгд</option>
                <option value="skincare">Арьс арчилгаа</option>
                <option value="haircare">Үс арчилгаа</option>
            </select>
            <button id="apply-filter">Шүүлт хийх</button>
        `;

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