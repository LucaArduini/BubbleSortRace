<?php   
    require_once('../database.php');
    session_start();

    $WinPlayer1 = 0;
    $WinPlayer2 = 0;
    $QuitPlayer1 = 0;
    $QuitPlayer2 = 0;

    $query = "SELECT COUNT(*) as X FROM challenges WHERE GameID='".$_GET['GameID']."' AND Time1 = 0;";
    $result = $mysqli->query($query);
    $QuitPlayer1 = $result->fetch_assoc();

    $query = "SELECT COUNT(*) as X FROM challenges WHERE GameID='".$_GET['GameID']."' AND Time2 = 0;";
    $result = $mysqli->query($query);
    $QuitPlayer2 = $result->fetch_assoc();

    $query = "SELECT COUNT(*) as X FROM challenges WHERE GameID='".$_GET['GameID']."' AND Time1 < Time2;";
    $result = $mysqli->query($query);
    $WinPlayer1 = $result->fetch_assoc();

    $query = "SELECT COUNT(*) as X FROM challenges WHERE GameID='".$_GET['GameID']."' AND Time1 > Time2;";
    $result = $mysqli->query($query);
    $WinPlayer2 = $result->fetch_assoc();

    if($QuitPlayer1['X'] == 5)                      // 4: HOST quit
        print 4;
    else if($QuitPlayer2['X'] == 5)                 // 5: JOIN quit
        print 5;
    else if($WinPlayer1['X'] == $WinPlayer2['X'])   // 2: Pareggio
        print 2; 
    else if($WinPlayer1['X'] > $WinPlayer2['X'])    // 1: Vittoria HOST
        print 1;
    else                                            // 0: Vittoria JOIN
        print 0;
?>