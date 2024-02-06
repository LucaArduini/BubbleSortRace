<?php
    require_once('../database.php');
    session_start();

    $query = "UPDATE users SET users.BestTime=".$_GET['t']." WHERE users.NomeUtente='".$_SESSION['user']."';";
    $result = $mysqli->query($query);

    print json_decode($result);
?>