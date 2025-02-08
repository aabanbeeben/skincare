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
                    font-family: Arial, sans-serif;
                }
                select, button {
                    margin: 5px;
                    padding: 8px;
                }
            </style>
            <select id="filter">
                <option value="">Бүгд</option>
                <option value="skincare">Арьс арчилгаа</option>
                <option value="haircare">Үс арчилгаа</option>
            </select>
            <input type="text" id="search-input" placeholder="Бүтээгдэхүүний нэр оруулна уу" />
            <button id="apply-filter">Шүүлт хийх</button>
        `;

        // Шүүлт хийх товчлуурын үйлдэл
        this.shadowRoot.getElementById("apply-filter").addEventListener("click", () => {
            const filterValue = this.shadowRoot.getElementById("filter").value;
            const searchTerm = this.shadowRoot.getElementById("search-input").value;
            // custom event үүсгэж parent-д илгээж байгаа
            this.dispatchEvent(new CustomEvent("filter-change", { detail: { filterValue, searchTerm }, bubbles: true }));
        });
    }
}

customElements.define("filter-component", FilterComponent);
