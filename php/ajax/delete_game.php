<?php
    session_start();
    
    require_once('../database.php');

    $query = "DELETE FROM games WHERE GameID = '".$_GET['GameID']."';";
    $query_result = $mysqli->query($query); 

    $_SESSION['GameID'] = 0;

    if(isset($_GET['EndGame']) && $_GET['EndGame'] == "OK") {
        $query = "DELETE FROM challenges WHERE GameID = '".$_GET['GameID']."';";
        $query_result = $mysqli->query($query);
    }

    if($query_result == true)
        print 1;
    else 
        print 0; 
?>