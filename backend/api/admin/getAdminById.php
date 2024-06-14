<?php
require_once "../api.php";

getRowById('admins');

/* header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$id = $input["id"];

$server_name = 'firstBlog';
$dbname = 'firstBlog';
$username = 'root';
$password = '';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli($server_name, $username, $password, $dbname);
if($conn->connect_error) {;
    die('Connection failed: '. $conn->connect_error);
};
$sql_query = "SELECT * FROM `admins` WHERE id = $id";
$result = $conn->query($sql_query);

$row = $result->fetch_assoc();

echo json_encode($row);

$conn->close();  */
