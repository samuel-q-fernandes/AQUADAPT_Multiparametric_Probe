<?php

$allowed_origins = [
    "http://localhost:63342",
    "https://aquadap-3add6.web.app",
    "https://aquadap-3add6.firebaseapp.com"
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Conexão com o banco de dados
$conn = new mysqli(" ", " ", " ", " ");

// Verificar a conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Consulta SQL para recuperar os dados
$sql = "SELECT * FROM coordinates";
$result = $conn->query($sql);

// Verificar se a consulta retornou algum resultado
header("Content-Type: application/json");
if ($result->num_rows > 0) {
    // Converter o resultado em formato JSON
    $rows = array();
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo json_encode(array()); // Retorna um array vazio se não houver resultados
}

// Fechar a conexão
$conn->close();
exit();
?>