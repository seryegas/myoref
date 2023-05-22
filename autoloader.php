<?php

spl_autoload_register(function ($class_name) {
    include __DIR__ . '/src/' . __NAMESPACE__ . '/' . $class_name . '.php';
});