<?php

//get all the distinct parematers per station


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


error_log("START script");



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


//echo 'Connection ';

// Conexão com o banco de dados


error_log("Before DB connect");
$conn = new mysqli("", "", "", "");
error_log("After DB connect");



//echo 'Connection failed DB';
//echo"hello";
// Check connection
if ($conn->connect_error) {
//	echo 'Connection failed';
    die("Connection failed: " . $conn->connect_error);

}
//echo 'hello2';
// Get the station parameter from the request
$station = $_GET['station']; // assuming it's passed as a GET parameter
//echo 'hello3';
// Prepare and execute the SELECT query to get unique parameters
$stmt = $conn->prepare("SELECT DISTINCT parameter FROM parametros WHERE idName = ?");


$stmt->bind_param("s", $station);
$stmt->execute();
$result = $stmt->get_result();

// Fetch results into an array
$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row['parameter'];
}

// Close connection
$stmt->close();
$conn->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($rows);
?>
