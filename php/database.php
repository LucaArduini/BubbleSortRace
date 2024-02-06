<?php

$config = [
    'host' => '127.0.0.1',
    'user' => 'root',
    'password' => '',
    'db' => 'bubblesortrace',
];

/* CONNESSIONE AL DATABASE */
$mysqli = new mysqli($config['host'], $config['user'], $config['password'], $config['db']);

if($mysqli->connect_error) {
    die('Connection error');
}

if($mysqli->select_db($config['db']) === false) {
    die ('Error: ' . mysql_error());
} 

?>