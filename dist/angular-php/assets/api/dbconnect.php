<?php
$servername = "sql208.epizy.com";
$username = "epiz_33473008";
$password = "Q2kyELWTOw8n";
$dbname = "epiz_33473008_userdatabase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>