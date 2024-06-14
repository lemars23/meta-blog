<?php

class Controller_Singlepost extends Controller {

    function __construct()
    {
        $this->model = new Model_Singlepost();
        $this->view = new View();
    }
    function action_index() {
        $uri = explode('/', $_SERVER['REQUEST_URI']);

        if(count($uri) != 4 || !is_numeric($uri[3])) {
            Route::ErrorPage404();
        }
        
        $this->view->generate('/pages/user/singlepost_view.php', '/templates/user_template_view.php', ['title' => 'Одиночная страница']);
    }

}