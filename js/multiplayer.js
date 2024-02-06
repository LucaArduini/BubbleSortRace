function createMPObjects() {
    mpGame = new MPGame();
    player = new Player();   
}

function insertChallenges() {
    for(let i=0; i<5; i++){
        mpGame.vecLevels[i] = Math.floor(Math.random()*12) +1;
 
        if(i>0){
            while(mpGame.vecLevels[i] == mpGame.vecLevels[i-1]) //evito che venga giocato due volte consecutivamente lo stesso livello
                mpGame.vecLevels[i] = Math.floor(Math.random()*12) +1;
        }
    }
   
    var param = {
        GameID: mpGame.gameID,
        Difficolta1: mpGame.vecDiff[0],
        Difficolta2: mpGame.vecDiff[1],
        Difficolta3: mpGame.vecDiff[2],
        Difficolta4: mpGame.vecDiff[3],
        Difficolta5: mpGame.vecDiff[4],
        NumLivello1: mpGame.vecLevels[0],
        NumLivello2: mpGame.vecLevels[1],
        NumLivello3: mpGame.vecLevels[2],
        NumLivello4: mpGame.vecLevels[3],
        NumLivello5: mpGame.vecLevels[4], 
   };

   $.getJSON("../php/ajax/set_game.php", param, function() {});
}



///////////////////CHIAMATE AJAX - MULTIPLAYER
function wait() { //viene chiamata dall'host quando viene premuto "host"
    $.ajax({
        type: "GET",
        url: "../php/ajax/get_status.php", 
        async: true, 
        success: function(object) {
            if(object != "-1") {
                clearInterval(waitID);
                insertChallenges();
                oneButtonBox({ title: "TIENITI PRONTO!", content:"La partita sta per iniziare"}, false);
                window.location.href = "../php/game.php?MPModeh";
            }
        }
    });
}

function hostForm(){
    document.getElementById("containerFormMultiplayer").style.display = "none";
    document.getElementById("containerFormHost").style.display = "grid";
    document.getElementById("btnLeaveMenu").style.display = "none";
    document.getElementById("btnAnnullaPartita").style.display = "block";

    $.ajax({
        type: "GET",
        url: "../php/ajax/get_code.php", 
        async: true, 
        success: function(object) {
            document.getElementById("gameCode").innerHTML = object;
            createMPObjects();
            player.host = true;
            sessionStorage.setItem('host', "1");
            mpGame.gameID = object;
            sessionStorage.setItem('gameID', object);
            waitID = setInterval(wait, 5000);
        }
    });
}

function joinForm(){
    document.getElementById("containerFormMultiplayer").style.display = "none";
    document.getElementById("containerFormJoin").style.display = "grid";    
}

function btnOkJoinForm() { //viene chiamata quando premo OK nel joinForm
    var GameID = document.getElementById("insertgameCode").value;

    let patt1 = /\b\d{8}\b/;
    if(!patt1.test(GameID)){
        oneButtonBox({ title: "ATTENTO!", content:"Un codice è formato da esattamente 8 numeri"}, false);
        return;
    }

    $.ajax({
        type: "GET",
        url: "../php/ajax/join_game.php?GameID=" + GameID, 
        async: true, 
        success: function(object) {
            if(object == "-1") {
                document.getElementById("insertgameCode").value = "";
                oneButtonBox({ title: "ATTENTO!", content:"Devi loggarti con un account diverso dall'host!"}, false);
            }
            else if(object == "-2") {
                document.getElementById("insertgameCode").value = "";
                oneButtonBox({ title: "ATTENTO!", content:"La partita in cui hai provato ad entrare ha già due giocatori."}, false);
            }
            else if(object == "-3") {
                document.getElementById("insertgameCode").value = "";
                oneButtonBox({ title: "ATTENTO!", content:"Non è stato possibile trovare la partita. Riprova!"}, false);
            }
            else if(object != '0') {
                createMPObjects();
                mpGame.gameID = object;
                oneButtonBox({ title: "TIENITI PRONTO!", content:"La partita sta per iniziare."}, false);
                checkForInsertID = setInterval(checkForInsert, 500);
            }
        }
    });
}

function checkForInsert() { //viene chiamata quando 
    $.ajax({
        type: "GET",
        url: "../php/ajax/check_game.php?GameID=" + mpGame.gameID, 
        async: true, 
        success: function(object) {
            if(object == "1") {
                clearInterval(checkForInsertID);
                sessionStorage.setItem('host', "0");
                sessionStorage.setItem('gameID', mpGame.gameID);
                window.location.href = "../php/game.php?MPModej";
            }
        }
    });
}

function downloadLevels() {
    createMPObjects();
    mpGame.gameID = sessionStorage.getItem('gameID');
    player.host = (sessionStorage.getItem('host') == "1") ? true : false;

    $.ajax({
        type: "GET",
        url: "../php/ajax/get_challenges.php?GameID=" + mpGame.gameID, 
        async: false, 
        success: function(object) {
            var json = $.parseJSON(object);
            for(let i = 1; i <= 5; i++) {
                mpGame.vecDiff[i-1] = json['Difficolta'+i];
                mpGame.vecLevels[i-1] = json['NumLivello'+i];
            }   
        }
    });
}

function exitMultiplayerHostMenu() { //viene chiamata quando premo "annulla partita" nell'host
    $.ajax({
        type: "GET",
        url: "../php/ajax/delete_game.php?GameID=" + mpGame.gameID, 
        async: true, 
        success: function(object) {
            if(object == "1")
                oneButtonBox({ title: "", content:"Sfida annullata con successo"}, true);
            else
                oneButtonBox({ title: "", content:"Ci dispiace ma non siamo riusciti ad annullare la sfida"}, true);

            clearInterval(waitID);
        }
    });
}

function deleteGame() {
    $.ajax({
        type: "GET",
        url: "../php/ajax/delete_game.php?GameID=" + mpGame.gameID + "&EndGame=OK", 
        async: true, 
        success: function() {}
    });
}

function checkForDone() {
    $.ajax({
        type: "GET",
        url: "../php/ajax/checkForDone.php?GameID=" + mpGame.gameID, 
        async: true, 
        success: function(object) {
            if(object == "1") {
                clearInterval(checkForDoneID);
                calculateWinner();
            }
        }
    });
}

function calculateWinner() {
    $.ajax({                                                                            // LEGENDA VALORI OBJECT:
        type: "GET",                                                                    // 0: Vittoria JOIN
        url: "../php/ajax/calculateWinner.php?GameID=" + mpGame.gameID,                 // 1: Vittoria HOST
        async: true,                                                                    // 2: Pareggio
        success: function(object) {                                                     // 4: HOST quit
            if(object == "1" && player.host == 1) {                                     // 5: JOIN quit
                setTimeout(deleteGame, 500);
                endMPGameAlert({ title: "HAI VINTO!", content:"Complimenti, ora prova a sfidare altre persone e vediamo se riuscirai a vincere ancora"}, true);
            }
            else if(object == "1" && player.host == 0) {
                endMPGameAlert({ title: "HAI PERSO!", content:"Risfida il tuo amico quando ti sarai allenato di più"}, false);
            }
            else if(object == "0" && player.host == 1) {
                endMPGameAlert({ title: "HAI PERSO!", content:"Risfida il tuo amico quando ti sarai allenato di più"}, false);
            }
            else if(object == "0" && player.host == 0) {
                setTimeout(deleteGame, 500);
                endMPGameAlert({ title: "HAI VINTO!", content:"Complimenti, ora prova a sfidare altre persone e vediamo se riuscirai a vincere ancora"}, true);
            }
            else if(object == "4" || object == "5") {
                setTimeout(deleteGame, 500);
                endMPGameAlert({ title: "PARTITA ANNULLATA", content:"Il tuo avversario ha abbandonato la partita"}, true);
            }
            else {
                if(player.host == 1)
                    setTimeout(deleteGame, 500);
                endMPGameAlert({ title: "PAREGGIO!", content:"Con un altro po' di allenamento riuscirai sicumente a batterlo"}, false);
            }
        }
    });
}