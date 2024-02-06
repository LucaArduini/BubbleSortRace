function createMenuLevel(){
    document.getElementById("menuMode").style.display = "none";
    document.getElementById("menuLevel").style.display = "grid";

    for(var i = 1; i <= TOTAL_NUM_DIFFICULTIES; i++){
        var containerLevels = document.createElement("div");
        containerLevels.setAttribute("class", "containerLevels");
        containerLevels.setAttribute("id", "containerLevels" + i);
        for(var j = 1; j <= TOTAL_NUM_LEVELS; j++){
            var buttonLevel = document.createElement("button");
            buttonLevel.setAttribute("class", "buttonLevel");
            buttonLevel.setAttribute("id", "bL_" + i + "."+ j);
            buttonLevel.innerText = j;
            let str_j = (j > 9)? j : '0'+j;
            let str = "../php/game.php?d=" + i + "&n=" + str_j;
            buttonLevel.addEventListener("click", function(){
                window.location.href = str;
            });
            containerLevels.appendChild(buttonLevel);
        }
        document.getElementById("menuLevel").appendChild(containerLevels);
    }    
}

function btnRaceMode(){
    window.location.href = "../php/game.php?RaceMode";
}

function btnMPMode(){
    window.location.href = "../php/multiplayer.php";
}

function logout() {
    window.location.href = "../php/logout.php";
}

function infoLandingPage() {
    window.location.href = "../php/info.php";
}