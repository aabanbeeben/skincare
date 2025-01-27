export async function fetchProducts() {
    try {
        const response = await fetch("data/products.json");
        if (!response.ok) throw new Error("Өгөгдөл татаж авахад алдаа гарлаа.");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Алдаа:", error);
        return [];
    }
}
