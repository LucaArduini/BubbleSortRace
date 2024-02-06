<?php
    session_start();
    $ok = 0;
    if(isset($_SESSION['errorState']) && $_SESSION['errorState'] > 0)
        print json_encode($_SESSION['errorState']);
    else    
        print json_encode($ok);
?>