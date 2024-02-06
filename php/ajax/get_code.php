<?php
    session_start();
    
    require_once('../database.php');

    do {
        
        $GameID = rand(10000000, 99999999);
        $query = "SELECT UserID FROM users WHERE NomeUtente = '".$_SESSION['user']."';";
        $query_result = $mysqli->query($query); 
        $UserID = $query_result->fetch_assoc();

        $query = "INSERT INTO games (GameID, Player1, Player2) VALUES ('".$GameID."', '".$UserID['UserID']."', '-1');";
        $query_result = $mysqli->query($query); 

        $_SESSION['GameID'] = $GameID;
 
    } while($query_result === false); 
 
    print $GameID; 
?>