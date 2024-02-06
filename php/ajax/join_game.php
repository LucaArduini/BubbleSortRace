<?php
    session_start();
    
    require_once('../database.php');

    $query = "SELECT UserID FROM users WHERE NomeUtente = '".$_SESSION['user']."'";
    $query_result = $mysqli->query($query); 
    $UserID = $query_result->fetch_assoc();

    $query = "SELECT Player1 FROM games WHERE GameID = '".$_GET['GameID']."';";
    $check = $mysqli->query($query);
    $Player1 = $check->fetch_assoc();

    $query = "SELECT Player2 FROM games WHERE GameID = '".$_GET['GameID']."';";
    $check = $mysqli->query($query);
    $Player2 = $check->fetch_assoc();

    if($Player1['Player1'] == $UserID['UserID']) {
        print -1;
    }
    elseif($Player2['Player2'] == null) {
        print -3;
    }
    elseif($Player2['Player2'] != "-1") {
        print -2;
    }
    else {
        $query = "SELECT GameID FROM games WHERE GameID = '".$_GET['GameID']."';";
        $check = $mysqli->query($query);

        $query = "UPDATE games SET Player2 = '".$UserID['UserID']."' WHERE GameID = '".$_GET['GameID']."';";
        $query_result = $mysqli->query($query); 

        $_SESSION['GameID'] = $_GET['GameID'];
        
        if($check->num_rows)
            print $_GET['GameID'];
        else 
            print 0;
    } 
?>