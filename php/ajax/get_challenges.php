<?php
    session_start();
    
    require_once('../database.php');

    $challenges = array();

    for($i = 0; $i < 5; $i++) {
        $index = $i + 1;
        $query = "SELECT Difficolta, NumLivello FROM challenges WHERE GameID = '".$_GET['GameID']."' AND N = '".$index."';";
        $query_result = $mysqli->query($query);
        $result = $query_result->fetch_assoc();
        $challenges['Difficolta'.$index] = $result['Difficolta'];
        $challenges['NumLivello'.$index] = $result['NumLivello'];
    }
 
    print json_encode($challenges); 
?>