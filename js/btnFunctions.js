function btnRestartLevel(){
    //non devo chiamare la makePlayground perchè i tubi non li cancello, riutilizzo gli stessi di prima
    //devo solo ripopolarli e nel farlo, dato che riscrivo il contenuto dei tubi sto facendo anche il reset del livello
    //chiamo la settings per azzerare il clickFlag e per azzerare il timer
    if(mouseBall != null)
        releaseMouse(false);
    settingsForNextLevel();
    populatePlayground();
}

function btnNextLevel(){
    settingsForNextLevel();
    if(level.numLevel == TOTAL_NUM_LEVELS){
        if(level.diff < TOTAL_NUM_DIFFICULTIES){
            level.diff++;
            level.numLevel = 1;
        }
        else if(level.diff == TOTAL_NUM_DIFFICULTIES){
            oneButtonBox({ title: ":(", content:"Spiacente, questo è l'ultimo livello." }, false);
            return;
        }
    }
    else{
        level.numLevel++;
    }
    let str_ = (level.numLevel > 9)? level.numLevel : '0'+level.numLevel;
    let str = "../php/game.php?d=" + level.diff + "&n=" + str_;
        window.location.href = str;
}

function btnPreviousLevel(){
    settingsForNextLevel();
    if(level.numLevel == 1){
        if(level.diff > 1){
            level.diff--;
            level.numLevel = 12;
        }
        else if(level.diff == 1){
            oneButtonBox({ title: ":(", content:"Spiacente, questo è il primo livello." }, false);
            return;
        }
    }
    else{
        level.numLevel--;
    }
    let str_ = (level.numLevel > 9)? level.numLevel : '0'+level.numLevel;
    let str = "../php/game.php?d=" + level.diff + "&n=" + str_;
        window.location.href = str;
}

function btnAudio(){
    if(gameInfo.soundOn){
        gameInfo.soundOn = false;
        document.getElementById("btnAudio").setAttribute("src", "../css/img/mute.png");
    }
    else{
        gameInfo.soundOn = true;
        document.getElementById("btnAudio").setAttribute("src", "../css/img/sound_on.png");
    }
}

function btnGoMenu(){
    window.location.href = "../php/menu.php";
}