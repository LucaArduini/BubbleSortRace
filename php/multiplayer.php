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
		<script src="../js/btnFunctions.js"></script>
		<script src="../js/globalMenu.js"></script>
		<script src="../js/adoss.js"></script>
		<script src="../js/multiplayer.js"></script>
		<script src="../js/utility.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </head>

    <body>
        <img src="../css/img/long_title.png" alt="Game Title" id="gameTitleLong">

        <div class ="containerForm" id="containerFormMultiplayer">
                <label>Scegli se essere l'host oppure<br>entrare in un partita</label>
                
                <div id="btnMPContainer">
                    <img src="../css/img/host.png" alt="btnHost" class="btnMP" id="host" onclick="hostForm()">
                    <img src="../css/img/join.png" alt="btnJoin" class="btnMP" id="join" onclick="joinForm()">
                </div>
        </div>

        <div class ="containerForm" id="containerFormHost">
                <label>Comunica il codice sottostante<br>all'amico con cui vuoi giocare</label>
                <h3 id="gameCode">--------</h3>
                <img src="../css/img/AnnullaPartita.png" alt="btnAnnullaPartita" id="btnAnnullaPartita" onclick="exitMultiplayerHostMenu()">
        </div>

        <div class ="containerForm" id="containerFormJoin">
                <label>Chiedi il codice della partita<br>al tuo amico host</label>
                <input class="formInput" id="insertgameCode">
                <div class="buttons-container_one">
                    <img src="../css/img/okBtn.png" alt="btnOK" class='alertBtnOne' id='__alarm_ok' onclick="btnOkJoinForm()">
                </div>
        </div>

        <img src="../css/img/exit.png" id="btnLeaveMenu" onclick="btnGoMenu()">
    </body>
</html>