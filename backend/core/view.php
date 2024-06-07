<?php

class View {
    // public $template_view

    function generate($content_view, $template_view,$data = null) {
        if(is_array($data)) {
            extract($data);
        }

        // include './backend/views/' . $template_view;

        include '../backend/views/' . $template_view;
    }
}