<?php   
    require_once('../database.php');
    session_start();
    $flag = 1;

    if($_GET['MPmode'] == "1") {
        for($i = 1; $i <= 5; $i++) {
            $query = "UPDATE challenges SET Time1=".$_GET['Time'.$i]." WHERE GameID='".$_GET['GameID']."' AND N = '".$i."';";
            $result = $mysqli->query($query);
            if($result == false) {
                $flag = 0;
                break;
            }
        }

        $query = "UPDATE games SET Done1 = '1' WHERE GameID='".$_GET['GameID']."';";
        $result = $mysqli->query($query);
        if($result == false)
            $flag = 0;
    }
    else {
        for($i = 1; $i <= 5; $i++) {
            $query = "UPDATE challenges SET Time2=".$_GET['Time'.$i]." WHERE GameID='".$_GET['GameID']."' AND N = '".$i."';";
            $result = $mysqli->query($query);
            if($result == false) {
                $flag = 0;
                break;
            }
        }

        $query = "UPDATE games SET Done2 = '1' WHERE GameID='".$_GET['GameID']."';";
        $result = $mysqli->query($query);
        if($result == false)
            $flag = 0;
    }

    print $flag;
?>