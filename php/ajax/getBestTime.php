<?php
    require_once('../database.php');
    session_start();

    $query = "SELECT BestTime FROM users WHERE NomeUtente='".$_SESSION['user']."';";
    $result_query = $mysqli->query($query);
    $bestTime = $result_query->fetch_assoc();

    print $bestTime['BestTime'];
?>