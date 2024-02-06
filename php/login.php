<?php
    session_start();
    // Script che serve a creare una connessione al DB, notificando un errore se qualcosa va storto
   $mysqli = mysqli_connect("localhost", "root", "", "bubblesortrace");
   if(mysqli_connect_errno()){
       printf("Fail to connect: %s\n", mysqli_connect_error());
       exit();
   }
 
    // Prepare() per evitare SQL_Injection
    if($state = $mysqli->prepare("SELECT NomeUtente, password FROM users WHERE NomeUtente= ?")){
        $state->bind_param('s', $_POST['user']);
        $state->execute();
        $state->store_result();
        
        if($state->num_rows > 0){
            $state->bind_result($username, $password);
            $state->fetch();
            if(password_verify($_POST['password'], $password)){
                $_SESSION['logged'] = true;
                $_SESSION['user'] = $username;
                $_SESSION['errorState'] = 0;
                header("Location: menu.php");
            }
            else{
                $_SESSION['errorState'] = 3;
                header("Location: ../index.php");
            }
        }
        else{
            $_SESSION['errorState'] = 2;
            header("Location: ../index.php");
        }
    }
