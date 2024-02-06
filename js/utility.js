function startStopwatch(){
    time.innerText = "00:00";
    stopwatchID = setInterval(function(){
        gameInfo.stopwatch++;
        time.innerText = displayTime(gameInfo.stopwatch);
    }, 1000);

    gameInfo.stopwatchOn = true;
}

function stopStopwatch(){
    clearInterval(stopwatchID);
    gameInfo.stopwatchOn = false;
}

function displayTime(time){
    let min = (Math.floor(time / 60));
    min = (min < 10) ? ('0'+min) : min;
    let sec = time % 60;
    sec = (sec < 10) ? ('0'+sec) : sec;
    return (min + ':' + sec);
}

///////////////////TRASFORMAZIONE MOUSE
function takeMouse(evt){
    mouseBall = document.createElement('div');
    mouseBall.setAttribute("class", "place");
    mouseBall.setAttribute("id", "mouseBall");
    mouseBall.style.backgroundImage = "url('../css/img/ball_" + level.tubesArray[ballSourceX][ballSourceY].color + ".png')";
    dashboard.appendChild(mouseBall);

    oldBackground = level.tubesArray[ballSourceX][ballSourceY].place.style.backgroundImage;
    mouseBall.style.top = (evt.clientY-26) + 'px';
    mouseBall.style.left = (evt.clientX-26) + 'px';
    level.tubesArray[ballSourceX][ballSourceY].place.style.backgroundImage = null;
    playground.style.cursor = "none";

    if(gameInfo.soundOn)
        raise_sound.play();
}

function releaseMouse(flag){
    playground.style.cursor = "default";
    dashboard.removeChild(mouseBall);
    mouseBall = null;

    if(flag && gameInfo.soundOn)
        drop_sound.play();
}

function moveMouse(evt){
    if(!gameInfo.clickFlag)
        return;
    
    mouseBall.style.top = (evt.clientY-26) + 'px';
    mouseBall.style.left = (evt.clientX-26) + 'px';
}

function drawMouseBall(){
    if(mouseBall)
        mouseBall.style.display = "block";
}
function eraseMouseball(){
    if(mouseBall)
        mouseBall.style.display = "none";
}



///////////////////ALERTBOX
function __alertbox_close(){
	for (let x of document.getElementsByClassName("alertbox")){
	    x.remove();
	}

	for (let x of document.getElementsByClassName("opacity")){
		x.remove();
	}
}
function fourButtonBox(){
	let opacity = document.createElement("div");
	opacity.className = "opacity";
	let alertb = document.createElement("div");
	alertb.className = 'alertbox alertbox3';

    let numImg = Math.floor(Math.random()*10) +1;

	alertb.innerHTML =   `
                            <h1>HAI VINTO!</h1>
                            <img alt="gif_win" src="../css/gif/win/`+numImg+`.gif" id="gif_win"/>
                            <div class='buttons-container_four'>
                                <img src="../css/img/previous_level.png" alt="btnPreviousLevel" class='alertBtnFour' id='__alarm_left'>
                                <img src="../css/img/go_menu.png" alt="btnGoMenu" class='alertBtnFour' id='__alarm_center'>
                                <img src="../css/img/restartLevel.png" alt="btnRestartLevel" class='alertBtnFour' id='__alarm_centerB'>
                                <img src="../css/img/next_level.png" alt="btnNextLevel" class='alertBtnFour' id='__alarm_right'>
                            </div>
                        `;
	document.body.appendChild(opacity);
	document.body.appendChild(alertb);

    document.getElementById("__alarm_left").onclick = function(){__alertbox_close(); btnPreviousLevel();}
	document.getElementById("__alarm_center").onclick = function(){__alertbox_close(); btnGoMenu();}
	document.getElementById("__alarm_centerB").onclick = function(){__alertbox_close(); btnRestartLevel();}
    document.getElementById("__alarm_right").onclick = function(){__alertbox_close();  btnNextLevel();}
}

function oneButtonBox(info, flag){
	let title = info.title;
	let content = info.content;

	let opacity = document.createElement("div");
	opacity.className = "opacity";
    let alertb = document.createElement("div");
	alertb.className = 'alertbox';

	alertb.innerHTML =   `
							<h1>`+title+`</h1>
							<p>`+content+`</p>
							<div class='buttons-container_one'>
                                <img src="../css/img/okBtn.png" alt="btnOK" class='alertBtnOne' id='__alarm_ok1'>
							</div>
							`;


	document.body.appendChild(opacity);
	document.body.appendChild(alertb);
	document.getElementById("__alarm_ok1").onclick = function(){__alertbox_close(); if(flag == true) btnGoMenu(); };
}

function oneButtonBoxFromIndex(info){
	let title = info.title;
	let content = info.content;

	let opacity = document.createElement("div");
	opacity.className = "opacity";
    let alertb = document.createElement("div");
	alertb.className = 'alertbox';

    	alertb.innerHTML =   `
							<h1>`+title+`</h1>
							<p>`+content+`</p>
							<div class='buttons-container_one'>
                                <img src="css/img/okBtn.png" alt="btnOK" class='alertBtnOne' id='__alarm_ok1'>
							</div>
							`;


	document.body.appendChild(opacity);
	document.body.appendChild(alertb);
	document.getElementById("__alarm_ok1").onclick = __alertbox_close;
}

function endMPGameAlert(info, boolWin){
    let title = info.title;
	let content = info.content;

	let opacity = document.createElement("div");
	opacity.className = "opacity";
	let alertb = document.createElement("div");
	alertb.className = 'alertbox endMPGameAlert';

    let numImg;
    let folder;
    if(boolWin){
        numImg = Math.floor(Math.random()*10) +1;
        folder = "win";
    }
    else{
        numImg = Math.floor(Math.random()*5) +1;
        folder = "lose";
    }

	alertb.innerHTML =   `
							<h1>`+title+`</h1>
							<p>`+content+`</p>
                            <img alt="gif_win" src="../css/gif/`+folder+'/'+numImg+`.gif" id="gif_win"/>
							<div class='buttons-container_one'>
                                <img src="../css/img/okBtn.png" alt="btnOK" class='alertBtnOne' id='__alarm_ok2'>
							</div>
							`;

	document.body.appendChild(opacity);
	document.body.appendChild(alertb);
	document.getElementById("__alarm_ok2").onclick = function(){__alertbox_close(); btnGoMenu();};
}

function leaveMPGame(){
	let opacity = document.createElement("div");
	opacity.className = "opacity";
    let alertb = document.createElement("div");
	alertb.className = 'alertbox';

	alertb.innerHTML =   `
							<h1>ATTENZIONE</h1>
							<p>Stai per abbandonare la partita multiplayer, sei sicuro?</p>
							<div class='buttons-container_one'>
                                <img src="../css/img/esci.png" alt="btnOK" class='alertBtnOne' id='__alarm_ok1' onclick>
                                <img src="../css/img/resta.png" alt="btnOK" class='alertBtnOne' id='__alarm_cancel'>
							</div>
							`;


	document.body.appendChild(opacity);
	document.body.appendChild(alertb);
	document.getElementById("__alarm_ok1").onclick = function(){__alertbox_close();
                                                                for(let i = 0; i < 5; i++)
                                                                player.vecTimes[i] = 0;
                                                                insertTimes();
                                                                window.location.href = "../php/menu.php";};
	document.getElementById("__alarm_cancel").onclick = function(){__alertbox_close();};
}