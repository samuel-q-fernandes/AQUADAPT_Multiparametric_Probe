<?php
ini_set('display_errors','1'); error_reporting(E_ALL); header('Content-Type:text/plain');
echo "PHP OK\n";
echo "mysqli: ".(extension_loaded('mysqli')?'yes':'no')."\n";
$mysqli=@new mysqli("","","","");
echo $mysqli->connect_errno ? "CONNECT_ERROR: $mysqli->connect_error\n" : "DB OK\n";
