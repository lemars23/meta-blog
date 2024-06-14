<?php

class Controller_Main extends Controller {

    function __construct()
    {
        $this->model = new Model_Main();
        $this->view = new View();
    }
    function action_index() {
        $this->view->generate('/pages/user/home_view.php', '/templates/user_template_view.php', ['title' => 'Главная страница']);
    }
}