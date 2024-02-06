<?php
    session_start();
    
    require_once('../database.php');

    $query = "SELECT UserID FROM users WHERE NomeUtente = '".$_SESSION['user']."';";
    $query_result = $mysqli->query($query); 
    $UserID = $query_result->fetch_assoc();

    $query = "SELECT Player2 FROM games WHERE GameID = '".$_SESSION['GameID']."';";
    $query_result = $mysqli->query($query); 
    $Player2 = $query_result->fetch_assoc();

    print $Player2['Player2']; 
?>