<?php
    session_start();
    if(!isset($_SESSION['logged'])){
        header("Location: ../index.php");
    }
?>

<!DOCTYPE html>
<html lang="it" id="overflowOK">
    <head>
        <meta charset="utf-8"> 
    	<meta name = "author" content = "Arduini Luca">
    	<meta name = "keywords" content = "Bubble Sort Race, Puzzle Game">
        <link rel="icon" href="../css/img/ball_red.png">
        <title>Bubble Sort Race</title>

   	 	<link rel="stylesheet" type="text/css" href="../css/BubbleSortRace.css">
   	 	<link rel="stylesheet" type="text/css" href="../css/menu.css">
   	 	<link rel="stylesheet" type="text/css" href="../css/login.css">
		<script src="../js/btnFunctions.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </head>

    <body>
        <div id="textBackground">
            <p class="paragraph">
                Sei pronto a giocare? Beh, se sei capitato qui si direbbe proprio di no, ma non preoccuparti,
                ora ti spiegherò le regole di gioco in un batter d'occhio.<br>
                <br>
                Per prima cosa, l'obiettivo del gioco è quello di disporre le palline insieme alle altre dello stesso colore.<br>
                <br>
                <em>COSA PUOI FARE:</em><br>
                ● Muovere una pallina per volta, spostandola di tubo in tubo.<br>
                ● Spostare un pallina in un tubo, o su un tubo non vuoto, ma che ha come pallina più alta, una dello stesso colore di quella che vuoi appoggiarci sopra.<br>
                <br>
                <em>COSA NON PUOI FARE:</em><br>
                ● Spostare una pallina in un tubo la cui prima pallina dall'alto non è dello stesso colore di quella che si ha in mano.<br>
                <br>
                <em>FINE!</em> Le regole sono poche e semplici, ora sta a te allenarti in modalità PRACTICE per imparare e migliorare sempre più.<br>
                <br>Una volta che ti sarai allenato potrai prendere parte alla RACE mode. Questa modalità consiste nel risolvere alcuni fra i livelli più difficili del gioco
                nel minor tempo possibile. A differenza della PRACTICE qui non potrai andare avanti o indietro nei livelli poiché il tuo unico scopo è quello di concentrarti per finire tutti i livelli
                nel minor tempo possibile.<br>
                <br>
                Cosa? Sei stanco di gareggiare contro te stesso? Vuoi sfoggiare la tua bravura con i tuoi amici?<br>
                Con la release 2.0 del gioco anche questo è diventato possibile, selezione la modalità MULTIPLAYER e sfidali tutti!<br>
                Tu e il tuo avversario affronterete gli stessi 5 livelli, la partita si gioca al meglio di 3, guadagnando un punto ogni volta che si riesce a finire il singolo livello prima dell'avversario.<br>
                <br>
                Ora che conosci tutto su questo gioco non mi resta altro che augurarti <em>BUONA FORTUNA!</em><br>
            </p>
        </div>
        <img src="../css/img/exit.png" id="btnExitInfo" onclick="btnGoMenu()">
    </body>
</html>