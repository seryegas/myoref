<?php

spl_autoload_register(function ($class_name) {
    include $_SERVER['DOCUMENT_ROOT'] . '/src/' . __NAMESPACE__ . '/' . $class_name . '.php';
});