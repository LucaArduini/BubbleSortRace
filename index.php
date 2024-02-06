<?php
session_start();
if(isset($_SESSION['logged'])){
   header("Location: php/menu.php");
}
?>

<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="utf-8"> 
    	<meta name="author" content="Arduini Luca">
    	<meta name="keywords" content="Bubble Sort Race, Puzzle Game">
        <link rel="icon" href="css/img/ball_red.png">
        <title>Bubble Sort Race</title>

        <link rel="stylesheet" type="text/css" href="css/login.css">
        <link rel="stylesheet" type="text/css" href="css/alertbox.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="js/adoss.js"></script>
        <script src="js/login.js"></script>
        <script src="js/utility.js"></script>
    </head>
    <body>
        <img src="css/img/long_title.png" alt="Game Title" id="gameTitleLong">
        <div class ="containerForm" id="containerFormLogin">
            <form name="myForm" method="post" action="php/login.php">
                <label> Username: 
                    <input class="formInput" type="text" name="user" required>
                </label>
                <label> Password: 
                    <input class="formInput" type="password" name="password"  required>
                </label>
                <button id="formBtn" type="submit">LOGIN</button>
                <p>Se non sei ancora registrato premi <button id="goToRegistration">qui</button>.</p>
            </form>
        </div>
    </body>
</html>