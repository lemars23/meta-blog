<?php

class Controller_Author extends Controller {

    function __construct()
    {
        $this->model = new Model_Author();
        $this->view = new View();
    }
    function action_index() {
        $this->view->generate('/pages/user/author_view.php', '/templates/user_template_view.php', ['title' => 'Страница автора']);
    }
}