///////////////////COSTANTI
TOTAL_NUM_DIFFICULTIES = 3;
TOTAL_NUM_LEVELS = 12;
NUM_RM_LEVELS = 10;
var raise_sound = new Audio('../css/sounds/raise_sound.mp3');
var drop_sound = new Audio('../css/sounds/drop_sound.mp3');



///////////////////VARIABILI GLOBALI
var gameInfo = null;
var level = null;
var mpGame = null;
var player = null;

var dashboard = null;
var playground = null;
var mouseBall = null;
var time = null;

var stopwatchID = null;
var checkForDoneID = null;
var waitID = null; 
var checkForInsertID = null;

var currentBestTime;
var ballSourceX;
var ballSourceY;
var oldBackground;
var RMarraydiff;
var RMarraylvl;
var pointer;



///////////////////DICHIARAZIONE CLASSI
function GameInfo(){
    this.stopwatch = 0;
    this.stopwatchOn = false;       //indica se il cronometro è attivo
    this.clickFlag = false;         //TRUE se ho preso una pallina in mano, FALSE altrimenti
    this.soundOn = true;            //indica se il suono di gioco è attivo
    this.raceMode = false;
    this.mpMode = false;
}

function Level(difficolta, numLevel, infoTubes, infoBalls){
    this.strSettingTubes = infoTubes.split(',');    //è un array che avrà sempre dimensione 2
    this.strSettingBalls = infoBalls.split(';');    //è un array che avrà dimensione = numTubes
    this.diff = difficolta;
    this.numLevel = numLevel;
    this.numTubes = this.strSettingBalls.length;
    this.numRows = (this.strSettingTubes[1] == 0)? 1 :2;
    this.tubesArray = new Array();
}

function MPGame(){
    this.gameID = 0;
    this.vecDiff = new Array(2,2,3,3,3);
    this.vecLevels = new Array();
}
 
function Player(){
    this.host = false;
    this.vecTimes = new Array(0,0,0,0,0);
}



///////////////////FUNZIONI PRINCIPALI
function beginGame(){
    gameInfo = new GameInfo();
    dashboard = document.getElementById("dashboard");
    playground = document.getElementById("playground");
    time = document.getElementById("time");

    let str = window.location.href;

    if(str.includes("RaceMode"))       //RACE MODE
        createRaceMode();
    else if(str.includes("MPMode"))    //MULTIPLAYER MODE
        createMPMode();
    else                               //PRACTICE MODE
        chargeAndStartLevel(parseInt(str.substr(-6, 1)), parseInt(str.substr(-2, 2)));
}

function chargeAndStartLevel(diff, numLevel){
    level = null;
    getLevelInfo(diff, numLevel);
    makeLevelPlayground();
    populatePlayground();
    settingsForNextLevel();
}

function settingsForNextLevel(){
    gameInfo.clickFlag = false;

    if(gameInfo.raceMode){      //RACE MODE
        document.getElementById("btnGoMenu").addEventListener("click", btnGoMenu);
        document.getElementById("bestTimeContainer").style.display = "block";
        document.getElementById("btnNextLevel").style.display = "none";
        document.getElementById("btnPreviousLevel").style.display = "none";
        return;
    }
    else if(gameInfo.mpMode){   //MULTIPLAYER MODE     
        document.getElementById("btnGoMenu").addEventListener("click", leaveMPGame);
        document.getElementById("btnNextLevel").style.display = "none";
        document.getElementById("btnPreviousLevel").style.display = "none";
    }
    else{                        //PRACTICE MODE
        document.getElementById("btnGoMenu").addEventListener("click", btnGoMenu);
        gameInfo.stopwatch = 0;         //deve stare qui e non nell' endLevel come per le altre mod. perchè questo è l'unico timer che deve essere azzerato anche quando restarto il livello
        time.innerText = "00:00";
    }
                        //PRACTICE MODE && MULTIPLAYER
    if(!gameInfo.stopwatchOn)
        startStopwatch();
}

function createRaceMode(){
    gameInfo.raceMode = true;
    gameInfo.stopwatch = 0;
    pointer = 0;
    RMarraydiff = new Array("2","2","2","2","2","3","3","3","3","3");
    RMarraylvl = new Array("1","4","7","10","12","1","4","7","10","12");
    startStopwatch();
    chargeAndStartLevel(RMarraydiff[pointer], RMarraylvl[pointer]);
    getBestTime();
    if(currentBestTime != 0){
        document.getElementById("currentBestTime").innerText = displayTime(currentBestTime);
    }
}

function createMPMode(){
    gameInfo.mpMode = true; 
    pointer = 0;

    downloadLevels();
    startStopwatch();
    chargeAndStartLevel(mpGame.vecDiff[pointer], mpGame.vecLevels[pointer]);
}

function endLevel(){
    if(gameInfo.raceMode){      //RACE MODE
        if(pointer == NUM_RM_LEVELS-1){     //fine ultimo livello race mode
            stopStopwatch();
            let old = currentBestTime;
            let current = gameInfo.stopwatch;

            if(old == 0){
                endMPGameAlert({ title: "Complimenti!", content:"Hai registrato il tuo primo tempo: "+displayTime(current)+".   Ora non resta che provare a migliorarti!"}, true);
                setBestTime(current);
            }
            else if(current < old){
                endMPGameAlert({ title: "Complimenti!", content:"Sei riuscito a battere il tuo miglior tempo. Il tuo nuovo tempo è: " + displayTime(current)}, true);
                setBestTime(current);
            }
            else
                endMPGameAlert({ title: ":(", content:"Non sei riuscito a battere il tuo miglior tempo, prova ad esercitarti di più e poi riprova"}, false);
            
        }
        else{                               //se ho ancora livelli da giocare
            pointer++;
            chargeAndStartLevel(RMarraydiff[pointer], RMarraylvl[pointer]);
        }
    }

    else if(gameInfo.mpMode){   //MULTIPLAYER MODE
        if(pointer == 4){                   //fine ultimo livello MP mode
            stopStopwatch();
            player.vecTimes[4] = gameInfo.stopwatch;
            insertTimes();
            oneButtonBox({ title: "ASPETTA IL TUO AVVERSARIO!", content:"Aspetta che anche il tuo avversario finisca di giocare per scoprire se hai vinto"}, false);
            checkForDoneID = setInterval(checkForDone, 100);
        }
        else{                               //se ho ancora livelli da giocare
            player.vecTimes[pointer] = gameInfo.stopwatch;
            gameInfo.stopwatch = 0;
            pointer++;
            chargeAndStartLevel(mpGame.vecDiff[pointer], mpGame.vecLevels[pointer]);
        }
    }

    else{                       //PRACTICE MODE
        stopStopwatch();
        fourButtonBox();
    }
}



///////////////////FUNZIONI DI GIOCO
function clicked(tubeId, event){
    var placeNum;
    if(!gameInfo.clickFlag){
        //trovo la ballSource
        placeNum = findLastBall(tubeId);
        if(placeNum >= 0){
            ballSourceX = tubeId;
            ballSourceY = placeNum;
            gameInfo.clickFlag = true;   
            takeMouse(event);          
        }
        //else
        //    starei spostando da un tubo che è vuoto e quindi non devo fare nulla
    }
    else{
        //trovo la ballDest
        placeNum = findLastBall(tubeId);
        if(placeNum >= 3){
            level.tubesArray[ballSourceX][ballSourceY].place.style.backgroundImage = oldBackground;
            oneButtonBox({ title: "ATTENTO!", content:"Non si può mettere la pallina dentro un tubo già pieno." }, false);
            gameInfo.clickFlag = false;
        }
        else if(placeNum >= -1 && placeNum < 3){
            moveBall(tubeId, placeNum + 1)
            gameInfo.clickFlag = false;
        }
        releaseMouse(true);
    }
}

function findLastBall(tubeId){
    if(gameInfo.clickFlag && tubeId == ballSourceX)     //se voglio rimettere la pallina al suo posto devo poterlo fare
        return ballSourceY-1;               //senza questo if, RImettendo la pallina in un tubo pieno, avrei un messaggio fasullo

    var dummy = -3;
    for (var i = 3; i >= 0 ; i--){
        if(!level.tubesArray[tubeId][i].empty){
            dummy = i;      //dummy prende il valore dell'indice del primo posto NON vuoto nel tubo,
            break;          //cioè l'indice della prima pallina presente
        }
    }
    if(dummy == -3 && gameInfo.clickFlag)   //se entro in questo if vuol dire che non ho trovato posti PIENI
        dummy = -1;                         //  -> quel tubo è vuoto, in questo caso ritorno -1 per segnalarlo 
    return dummy;
}

function moveBall(ballDestX, ballDestY){
    if(ballSourceX == ballDestX){
        level.tubesArray[ballSourceX][ballSourceY].place.style.backgroundImage = oldBackground;
    }
    else if(ballDestY == 0 || level.tubesArray[ballSourceX][ballSourceY].color == level.tubesArray[ballDestX][ballDestY-1].color){ //cioè se la destinazione è valida
        var oldColor = level.tubesArray[ballSourceX][ballSourceY].color;
        level.tubesArray[ballSourceX][ballSourceY].place.style.backgroundImage = null;
        level.tubesArray[ballSourceX][ballSourceY].color = "none";
        level.tubesArray[ballSourceX][ballSourceY].empty = true;
        
        level.tubesArray[ballDestX][ballDestY].color = oldColor;
        level.tubesArray[ballDestX][ballDestY].empty = false;
        level.tubesArray[ballDestX][ballDestY].place.style.backgroundImage = oldBackground; 
        setTimeout(function() {
            checkWin();        
        }, 50);                
    }
    else{
        level.tubesArray[ballSourceX][ballSourceY].place.style.backgroundImage = oldBackground;
        oneButtonBox({ title: "ATTENTO!", content:"Non si può mettere una pallina sopra un'altra di colore diverso." }, false);
    }
}

function checkWin(){
    for(var i = 0; i < level.numTubes; i++){        //controllo che tutte le provette siano piene
        if(level.tubesArray[i][3].empty && !level.tubesArray[i][0].empty)
           return;
    }

    var colorInThisTube;
    for(var i=0; i < level.numTubes; i++){
        colorInThisTube = level.tubesArray[i][0].color;

        for(var j = 1; j < 4; j++){
            if(level.tubesArray[i][j].empty)
                break;
            if(level.tubesArray[i][j].color != colorInThisTube)
                return;
        }
    }
    endLevel();
}



///////////////////CHIAMATE AJAX - SINGLE PLAYER
function getLevelInfo(diff, numLevel){
    $.ajax({
        type: "GET",
        url: "../php/ajax/getLevel.php?d=" + diff + "&n=" + numLevel, 
        async: false, 
        success: function(object) {
            var param = JSON.parse(object);
            level = new Level(diff, numLevel, param.infoTubes, param.infoBalls);
        }
    });
}

function getBestTime(){
    $.ajax({
        type: "GET",
        url: "../php/ajax/getBestTime.php", 
        async: false, 
        success: function(object) {
            currentBestTime = object;
        }
    });
}

function setBestTime(time){
    $.ajax({
        type: "GET",
        url: "../php/ajax/setBestTime.php?t=" + time, 
        async: true, 
        success: function(object) {
            ;
        }
    });
}

function insertTimes() {
    let x = (player.host) ? "1" : "2";
    $.ajax({
        type: "GET",
        url: "../php/ajax/insertTimesMP.php?GameID=" + mpGame.gameID + "&MPmode=" + x + "&Time1=" + player.vecTimes[0] + "&Time2=" + player.vecTimes[1] + "&Time3=" + player.vecTimes[2] + "&Time4=" + player.vecTimes[3] + "&Time5=" + player.vecTimes[4], 
        async: true, 
        success: function() {
            ;
        }
    });
}