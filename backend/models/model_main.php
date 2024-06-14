<?php

class Model_Main extends Model {
    function get_data() {
        return [
            'name' => 'John'
        ];
    }

    function get_admins() {
        $getAdmins = function() {
            require_once '../backend/api/admin/getAllAdmins.php';
        };

        return $getAdmins;
    }


    function get_categories() {
        $getCategories = function() {
            require_once '../backend/api/category/getAllCategories.php';
        };

        return $getCategories;
    }

    function get_header_links() {
        $getHeaderLinks = function() {
            require_once '../backend/api/header_link/getAllHeaderLinks.php';
        };

        return $getHeaderLinks;
    }

    function get_all_posts() {
        $getAllPosts = function() {
            require_once '../backend/api/post/getAllPosts.php';
        };

        return $getAllPosts;
    }
}