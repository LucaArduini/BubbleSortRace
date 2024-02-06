<?php
    session_start();
    
    require_once('../database.php');

    $query = "SELECT COUNT(*) AS Result FROM challenges WHERE GameID = '".$_GET['GameID']."' AND N = '5';";
    $query_result = $mysqli->query($query); 

    $result = array('Result' => 0);

    if($query_result != null)
        $result = $query_result->fetch_assoc();

    print $result['Result']; 
?>