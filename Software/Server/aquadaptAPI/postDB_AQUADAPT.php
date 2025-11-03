
<?php



$servername = "";

// REPLACE with your Database name
$dbname = "";
// REPLACE with Database user
$username = "";
// REPLACE with Database user password
$password = "";

// Keep this API Key value to be compatible with the ESP32 code provided in the project page.
// If you change this value, the ESP32 sketch needs to match
$api_key_value = "";

$api_key= $sensor = $location = $value1 = $value2 = $value3 = $value4 = $value5 = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {


	$message = $_POST["idName"];
	$message2 = $_POST["date"];
	$message3 = $_POST["hour"];
	$message4 = $_POST["parameter"];
	$message5 = $_POST["value"];
	$message6 = $_POST["unit"];
	$message7 = $_POST["obs"];

	// Log to the default error log
	error_log($message);
	error_log($message2);
	error_log($message3);
	error_log($message4);
	error_log($message5);
	error_log($message6);
	error_log($message7);


	// Log to a custom log file
	$logFile = "custom.log";
	error_log($message, 3, $logFile);


	$api_key = test_input($_POST["api_key"]);
	if($api_key == $api_key_value) {
		//$sensor = test_input($_POST["id"]);
		$sensor = test_input($_POST["idName"]);
		$location = test_input($_POST["date"]);
		$value1 = test_input($_POST["hour"]);
		$value2 = test_input($_POST["parameter"]);
		$value3 = test_input($_POST["value"]);
		$value4 = test_input($_POST["unit"]);
		$value5 = test_input($_POST["obs"]);

		echo "hello";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}

		$sql = "INSERT INTO parametros ( idName, date, hour, parameter, value, unit, obs)  VALUES ('" . $sensor . "', '" . $location . "', '" . $value1 . "', '" . $value2 . "', '" . $value3 . "','" . $value4 . "','" . $value5 . "')";

		if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
		}
		else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		$conn->close();
	}
	else {
		echo "Wrong API Key provided.";
	}

}
else {
	echo "No data posted with HTTP POST.";
}

function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}