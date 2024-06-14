<?php

class Controller_Category extends Controller {

    function __construct()
    {
        $this->model = new Model_Category();
        $this->view = new View();
    }
    function action_index() {
        $this->view->generate('/pages/user/category_view.php', '/templates/user_template_view.php', ['title' => 'Страница категории']);
    }
}