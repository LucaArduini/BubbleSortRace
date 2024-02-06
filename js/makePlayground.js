function makeLevelPlayground(){
    playground.innerHTML = "";
    playground.onmousemove = moveMouse;
    playground.onmouseenter = drawMouseBall;
    playground.onmouseleave = eraseMouseball;  

    let scoreboard = document.createElement("div");
    scoreboard.setAttribute("id", "scoreboard");
    scoreboard.style.cursor = "default";
    playground.appendChild(scoreboard);

    if(gameInfo.raceMode)      //RACE MODE
        document.getElementById("scoreboard").innerText = (pointer+1) + " / " + NUM_RM_LEVELS;
    else if(gameInfo.mpMode)   //MULTIPLAYER MODE
        document.getElementById("scoreboard").innerText = (pointer+1) + " / " + 5;
    else                       //PRACTICE MODE
        document.getElementById("scoreboard").innerText = level.diff + " - " + level.numLevel;

    var containerFirstRow = document.createElement("div");
    containerFirstRow.setAttribute("id", "containerFirstRow");
    for(var i = 0; i < level.strSettingTubes[0]; i++) {
        var tube = makeTube(i, level.numRows);
        containerFirstRow.appendChild(tube);
    }
    playground.appendChild(containerFirstRow);
    
    if(level.numRows > 1) {
        containerFirstRow.style.top = "18%";
        var conatinerSecondRow = document.createElement("div");
        conatinerSecondRow.setAttribute("id", "containerSecondRow");
        for(var j = 0; j < level.strSettingTubes[1]; j++) {
            var tube = makeTube(j + parseInt(level.strSettingTubes[0]), level.numRows);
            conatinerSecondRow.appendChild(tube);
        }
        playground.appendChild(conatinerSecondRow);
    }
}

function makeTube(tubeID) {
    var containerTube = document.createElement("div");
    containerTube.setAttribute("class", "containerTube");
    var headTube = document.createElement("div");
    headTube.setAttribute("class", "headTube");
    var tube = document.createElement("div");
    tube.setAttribute("class", "tube");

    tube.setAttribute("id", "tube"+tubeID);
    tube.addEventListener("click", function(event){
        clicked(tubeID, event);
    });
    containerTube.appendChild(headTube);
    containerTube.appendChild(tube);

    level.tubesArray[tubeID] = new Array();
    var place;

    for(var j = 3; j >= 0; j--) {
        place = document.createElement("div");
        place.setAttribute("class", "place");
        place.setAttribute("id", "tube"+ tubeID + "_place"+ j);
        tube.appendChild(place);
        level.tubesArray[tubeID][j] = {
            place: place, 
            color: '',
            empty: true
        }
    }
    return containerTube;
}

function populatePlayground() {
    for(var i = 0; i < level.numTubes; i++){
        var ballsColour = level.strSettingBalls[i].split(',');
        for(var j = 0; j < 4; j++){
            switch(ballsColour[j]){
                case "b": { 
                    level.tubesArray[i][j].place.style.backgroundImage = "url('../css/img/ball_blue.png')";
                    level.tubesArray[i][j].color = "blue";
                    level.tubesArray[i][j].empty = false;
                    } break;
                case "c": { 
                    level.tubesArray[i][j].place.style.backgroundImage = "url('../css/img/ball_cyan.png')";
                    level.tubesArray[i][j].color = "cyan";
                    level.tubesArray[i][j].empty = false;
                    } break;
                case "g": { 
                    level.tubesArray[i][j].place.style.backgroundImage = "url('../css/img/ball_green.png')";
                    level.tubesArray[i][j].color = "green";
                    level.tubesArray[i][j].empty = false;
                    } break;
                case "o": { 
                    level.tubesArray[i][j].place.style.backgroundImage = "url('../css/img/ball_orange.png')";
                    level.tubesArray[i][j].color = "orange";
                    level.tubesArray[i][j].empty = false;
                    } break;
                case "p": { 
                    level.tubesArray[i][j].place.style.backgroundImage = "url('../css/img/ball_pink.png')";
                    level.tubesArray[i][j].color = "pink";
                    level.tubesArray[i][j].empty = false;
                    } break;
                case "r": { 
                    level.tubesArray[i][j].place.style.backgroundImage = "url('../css/img/ball_red.png')";
                    level.tubesArray[i][j].color = "red";
                    level.tubesArray[i][j].empty = false;
                    } break;
                case "v": { 
                    level.tubesArray[i][j].place.style.backgroundImage = "url('../css/img/ball_violet.png')";
                    level.tubesArray[i][j].color = "violet";
                    level.tubesArray[i][j].empty = false;
                    } break;
                case "w": { 
                    level.tubesArray[i][j].place.style.backgroundImage = "url('../css/img/ball_white.png')";
                    level.tubesArray[i][j].color = "white";
                    level.tubesArray[i][j].empty = false;
                    } break;
                case "y": { 
                    level.tubesArray[i][j].place.style.backgroundImage = "url('../css/img/ball_yellow.png')";
                    level.tubesArray[i][j].color = "yellow";
                    level.tubesArray[i][j].empty = false;
                    } break;   
                case "n": {
                    level.tubesArray[i][j].place.style.backgroundImage = null;
                    level.tubesArray[i][j].color = "none";
                    level.tubesArray[i][j].empty = true;
                    } break;
            }
        }
    }
}