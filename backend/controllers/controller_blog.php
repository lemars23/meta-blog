<?php

class Controller_Blog extends Controller {

    function __construct()
    {
        $this->model = new Model_Blog();
        $this->view = new View();
    }
    function action_index() {
        $this->view->generate('/pages/user/blog_view.php', '/templates/user_template_view.php', ['title' => 'Страница блога']);
    }
}