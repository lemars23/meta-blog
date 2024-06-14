<?php
class Route
{
	static function start()
	{
		// контроллер и действие по умолчанию
		$controller_name = 'Main';
		$action_name = 'index';
		
		$routes = explode('/', $_SERVER['REQUEST_URI']);

		// получаем имя контроллера
		if ( !empty($routes[1]) )
		{	
			$controller_name = $routes[1];
		}
		
		// получаем имя экшена
		if ( !empty($routes[2]) )
		{
			$action_name = $routes[2];
		}

        $model_name = 'Model_' . $controller_name;
        $controller_name = 'Controller_' . $controller_name;
        $action_name = 'action_'. $action_name;

        // Подключаю модели
        $model_file = strtolower($model_name) . '.php';
        $model_path = '../backend/models/'. $model_file;
        if(file_exists($model_path)) {
            include '../backend/models/'. $model_file;
        }

        // Подключаю контроллер
        $controller_file = strtolower($controller_name) . '.php';
        $controller_path = '../backend/controllers/'. $controller_file;

        if(file_exists($controller_path)) {
            include '../backend/controllers/'. $controller_file;
        } else {
            http_response_code(404);
            exit;
        }

        // Создаем контроллер
        $controller = new $controller_name;
        $action = $action_name;

        if(method_exists($controller, $action)) {
            $controller->$action();
        } else {
            Route::ErrorPage404();
        }
    }

    static function ErrorPage404() {
        
        $host = 'http://'.$_SERVER['HTTP_HOST'].'/';
        header('HTTP/1.1 404 Not Found');
		header("Status: 404 Not Found");
		header('Location:'.$host.'404');
        http_response_code(404);
        exit();
    }
}
