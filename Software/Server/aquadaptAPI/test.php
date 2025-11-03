<!DOCTYPE html>
<html><body>
<?php
/*
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp32-esp8266-mysql-database-php/

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*/

$servername = "";

// REPLACE with your Database name
$dbname = "";
// REPLACE with Database user
$username = "";
// REPLACE with Database user password
$password = "*";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, idName, date, hour, parameter, value, unit, obs FROM parametros ORDER BY id ASC";

echo '<table cellspacing="5" cellpadding="5">
      <tr> 
        <td>ID</td> 
        <td>ID Name</td> 
        <td>Data</td> 
        <td>Hora</td> 
        <td>Parâmetro</td>
        <td>Valor</td> 
        <td>Unidade</td> 
        <td>Observações</td> 
      </tr>';

if ($result = $conn->query($sql)) {
	while ($row = $result->fetch_assoc()) {
		$row_id = $row["id"];
		$row_sensor = $row["idName"];
		$row_location = $row["date"];
		$row_value1 = $row["hour"];
		$row_value2 = $row["parameter"];
		$row_value5 = $row["value"];
		$row_value4 = $row["unit"];
		$row_reading_time = $row["obs"];
		// Uncomment to set timezone to - 1 hour (you can change 1 to any number)
		//$row_reading_time = date("Y-m-d H:i:s", strtotime("$row_reading_time - 1 hours"));

		// Uncomment to set timezone to + 4 hours (you can change 4 to any number)
		//$row_reading_time = date("Y-m-d H:i:s", strtotime("$row_reading_time + 4 hours"));

		echo '<tr> 
                <td>' . $row_id . '</td> 
                <td>' . $row_sensor . '</td> 
                <td>' . $row_location . '</td> 
                <td>' . $row_value1 . '</td> 
                <td>' . $row_value2 . '</td>
                <td>' . $row_value5 . '</td> 
                <td>' . $row_value4 . '</td> 
                <td>' . $row_reading_time . '</td> 
              </tr>';
	}
	$result->free();
}

$conn->close();
?>
</table>
</body>
</html>