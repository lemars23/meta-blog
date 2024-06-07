<?php

class Controller_Main extends Controller {
    function action_index() {
        $this->view->generate('main_view.php', 'user_template_view.php', ['data' => 'something another']);
    }

    function action_contact() {
        $this->view->generate('contact_view.php', 'admin_template_view.php', ['data' => 'something another']);
    }
}