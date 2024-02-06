<?php

    session_start();

    // Script che serve a creare una connessione al DB, notificando un errore se qualcosa va storto
   $mysqli = mysqli_connect("localhost", "root", "", "bubblesortrace");
   if(mysqli_connect_errno()){
       printf("Fail to connect: %s\n", mysqli_connect_error());
       exit();
   }

    
    $username = $_POST['user'];
    // Utilizzo password_hash() per poter utilizzare password_verify() in caso di login
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    
 

    $query = "INSERT INTO users (NomeUtente, Password, BestTime) VALUES ('{$username}', '{$password}', '0');";
    
    $result = $mysqli->query($query);
  
    // Se $result è false, allora significa che l'inserimento non è andato a buon fine
    // e questo succede se l'username esiste già. 
    
    if(!$result){
        $_SESSION['errorState'] = 1;
        header("Location: ../index.php");
    }
    else{
        $_SESSION['errorState'] = 0;
        // La registrazione è andata a buon fine.
        header("Location: menu.php");
    }
