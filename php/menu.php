<?php
    session_start();
    if(!isset($_SESSION['logged'])){
        header("Location: ../index.php");
    }
?>

<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="utf-8"> 
    	<meta name = "author" content = "Arduini Luca">
    	<meta name = "keywords" content = "Bubble Sort Race, Puzzle Game">
        <link rel="icon" href="../css/img/ball_red.png">
        <title>Bubble Sort Race</title>

   	 	<link rel="stylesheet" type="text/css" href="../css/BubbleSortRace.css">
   	 	<link rel="stylesheet" type="text/css" href="../css/menu.css">
   	 	<link rel="stylesheet" type="text/css" href="../css/login.css">
        <link rel="stylesheet" type="text/css" href="../css/alertbox.css">
		<script src="../js/adoss.js"></script>
		<script src="../js/globalMenu.js"></script>
        <script src="../js/btnFunctions.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </head>
    <body>
        <div id="menu">
            <img src="../css/img/long_title.png" alt="Game Title" id="gameTitleLong">
            <div id="menuMode">
                <h2>Seleziona la modalità di gioco</h2>
                <div id="btnModeContainer">
                    <img src="../css/img/practice_mode.png" alt="Practice Mode" class="btnMode" id="practice_mode" onclick="createMenuLevel()">
                    <img src="../css/img/race_mode.png" alt="Race Mode" class="btnMode" id="race_mode" onclick="btnRaceMode()">
                    <img src="../css/img/multiplayer_mode.png" alt="Multiplayer Mode" class="btnMode" id="mp_mode" onclick="btnMPMode()">
                </div> 
                <img src="../css/img/logout.png" alt="Logout" id="logout" onclick="logout()">
                <div id="img_info">
                    <img src="../css/img/info2.png" alt="Game Info" id="info" onclick="infoLandingPage()">
                </div>  
            </div>
            <div id="menuLevel">
                <img src="../css/img/easy.png" alt="Easy Level" id="easy" class="imgLevel">
                <img src="../css/img/normal.png" alt="Normal Level" id="normal" class="imgLevel">
                <img src="../css/img/hard.png" alt="Hard Level" id="hard" class="imgLevel">
                <img src="../css/img/exit.png" alt="exit Menu" id="btnLeaveMenu" onclick="btnGoMenu()">
            </div>
        </div>
    </body>
</html>