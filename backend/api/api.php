<?php

$server_name = 'firstBlog';
$dbname = 'firstBlog';
$username = 'root';
$password = '';

function getAll($table) {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli($GLOBALS['server_name'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
    if($conn->connect_error) {
        die('Connection failed: '. $conn->connect_error);
    }
    $sql_query = "SELECT * FROM `$table`";
    $result = $conn->query($sql_query);
    $json = [];
    while($row = $result->fetch_assoc()) {
        array_push($json, $row);
    }
    print_r(json_encode($json));
    $conn->close();
}

function getLastRows($table, $count) {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli($GLOBALS['server_name'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
    if($conn->connect_error) {
        die('Connection failed: '. $conn->connect_error);
    }
    $sql_query = "SELECT * FROM `$table` ORDER BY `$table`.`id` DESC LIMIT $count";
    $result = $conn->query($sql_query);
    $json = [];
    while($row = $result->fetch_assoc()) {
        array_push($json, $row);
    }
    print_r(json_encode($json));
    $conn->close();
}

function getRowById($table) {
    header('Content-Type: application/json');
    $input = json_decode(file_get_contents('php://input'), true);

    $id = $input["id"];

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli($GLOBALS['server_name'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
    if($conn->connect_error) {;
        die('Connection failed: '. $conn->connect_error);
    };
    $sql_query = "SELECT * FROM `$table` WHERE id = $id";
    $result = $conn->query($sql_query);

    $row = $result->fetch_assoc();

    echo json_encode($row);

    $conn->close(); 
}

function getRowArticleByUri() {
    header('Content-Type: application/json');
    $input = json_decode(file_get_contents('php://input'), true);

    $uri = $input["uri"];

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $conn = new mysqli($GLOBALS['server_name'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
    if($conn->connect_error) {
        die('Connection error: ' . $conn->connect_error);
    }

    $sql_query = "SELECT * FROM `articles` WHERE uri = '$uri'";
    $result = $conn->query($sql_query);

    $row = $result->fetch_assoc();
    
    echo json_encode($row);

    $conn->close();
}