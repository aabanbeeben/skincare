<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Зөвхөн POST хүсэлт дэмжигдэнэ!"]);
    exit;
}

$jsonFile = "assets/js/products.json";
$products = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : [];

$newProduct = [
    "id" => uniqid(),
    "name" => $_POST["name"],
    "price" => $_POST["price"],
    "category" => $_POST["category"],
    "image" => $_POST["image"]
];

$products[] = $newProduct;

if (file_put_contents($jsonFile, json_encode($products, JSON_PRETTY_PRINT))) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "JSON файлд хадгалах үед алдаа гарлаа!"]);
}
?>
