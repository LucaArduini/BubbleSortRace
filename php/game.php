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
   	 	<link rel="stylesheet" type="text/css" href="../css/tubes.css">
        <link rel="stylesheet" type="text/css" href="../css/alertbox.css">
		<script src="../js/utility.js"></script>
		<script src="../js/adoss.js"></script>
		<script src="../js/btnFunctions.js"></script>
		<script src="../js/makePlayground.js"></script>
		<script src="../js/multiplayer.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </head>

    <body onload="beginGame()">
        <div id="dashboard">
            <aside id="asideLeft">
                <img src="../css/img/short_title.png" alt="Game Title" id="gameTitleShort">
                <div id="bestTimeContainer">
                    <img src="../css/img/best_time.png" alt="bestTime" id="bestTime_background">
                    <div id="currentBestTime">-- : --</div>
                </div>
                <img src="../css/img/go_menu.png" alt="btnGoMenu" class="btnGame" id="btnGoMenu">
                <img src="../css/img/sound_on.png" alt="btnAudio" class="btnGame" id="btnAudio" onclick="btnAudio()">
            </aside>
            <div id="playground"></div>
            <aside id="asideRight">
                <img src="../css/img/next_level.png" alt="btnNextLevel" class="btnGame" id="btnNextLevel" onclick="btnNextLevel()">
                <img src="../css/img/restartLevel.png" alt="btnRestart" class="btnGame" id="btnRestart" onclick="btnRestartLevel()">
                <img src="../css/img/previous_level.png" alt="btnPreviousLevel" class="btnGame" id="btnPreviousLevel" onclick="btnPreviousLevel()">
                <div id="stopwatchContainer">
                    <img src="../css/img/rettangolo_medio.png" alt="stopwatch" id="stopwatch_background">
                    <div id="time">00:00</div>
                </div>
            </aside>
        <div>
    </body>
</html>