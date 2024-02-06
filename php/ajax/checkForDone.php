<?php
    session_start();
    
    require_once('../database.php');

    $query = "SELECT Done1 FROM games WHERE GameID = '".$_GET['GameID']."';";
    $query_result = $mysqli->query($query);
    $Done1 = $query_result->fetch_assoc(); 

    $query = "SELECT Done2 FROM games WHERE GameID = '".$_GET['GameID']."';";
    $query_result = $mysqli->query($query);
    $Done2 = $query_result->fetch_assoc();

    if($Done1['Done1'] == 1 && $Done2['Done2'] == 1)
        print 1;
    else 
        print 0;
?>