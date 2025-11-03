<?php

//get values of the parameters chosen for the graph

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
$conn = new mysqli("", "", "", "");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//echo("hello");
// Get the station and parameter parameters from the request
$station = $_GET['station']; // assuming it's passed as a GET parameter
$parameter = $_GET['parameter']; // assuming it's passed as a GET parameter

// Prepare and execute the SELECT query
$stmt = $conn->prepare("SELECT * FROM parametros WHERE idName = ? AND parameter = ?");
$stmt->bind_param("ss", $station, $parameter);
$stmt->execute();
$result = $stmt->get_result();

// Fetch results into an array
$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

// Close connection
$stmt->close();
$conn->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($rows);
?>
