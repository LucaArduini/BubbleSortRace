<?php
    require_once('../database.php');

    session_start(); 

    $query = "SELECT SettingTubes, SettingBalls FROM levels WHERE levels.Difficolta = '".$_GET['d']."' AND levels.NumLivello = '".$_GET['n']."';";
    $result = $mysqli->query($query);

    $resultLevel = $result->fetch_assoc();

    $var = array('infoTubes' => $resultLevel['SettingTubes'], 'infoBalls' => $resultLevel['SettingBalls']);
    
    print json_encode($var);
?>