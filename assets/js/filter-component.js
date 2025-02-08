class FilterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <select id="filter">
                <option value="">Бүгд</option>
                <option value="skincare">Арьс арчилгаа</option>
                <option value="haircare">Үс арчилгаа</option>
            </select>
            <button id="apply-filter">Шүүх</button>
        `;

        this.shadowRoot.getElementById("apply-filter").addEventListener("click", () => {
            const filterValue = this.shadowRoot.getElementById("filter").value;
            this.dispatchEvent(new CustomEvent("filter-change", { detail: filterValue, bubbles: true }));
        });
    }
    
}
function setupSearch(products) {
    document.getElementById("search-input").addEventListener("input", () => {
        applyFilter(products, document.getElementById("filter").value, document.getElementById("search-input").value);
    });
}
customElements.define("filter-component", FilterComponent);
