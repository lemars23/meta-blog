<?php

$route = $_SERVER['DOCUMENT_ROOT'] . '/backend';

require_once $route . '/api/api.php';
require_once $route . "/core/controller.php";
require_once $route . "/core/model.php";
require_once $route . "/core/view.php";
require_once $route . "/core/route.php";




Route::start();