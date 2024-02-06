<?php
    session_start();
    
    require_once('../database.php');

    $flag = 1;

    for($i = 0; $i < 5; $i++) {
        $index = $i + 1;
        $query = "INSERT INTO challenges (GameID, N, Difficolta, NumLivello, Time1, Time2) VALUES ('".$_GET['GameID']."', '".$index."', '".$_GET['Difficolta'.$index]."', '".$_GET['NumLivello'.$index]."', 0, 0);";
        $query_result = $mysqli->query($query);
        if($query_result == false) {
            $flag = 0;
            break;
        }
    }
 
    print $flag; 
?>