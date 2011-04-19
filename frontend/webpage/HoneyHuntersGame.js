/*$(window).ready(function() { 
  var game = new HoneyHuntersGame;
  game.initGame(); 
});*/
var SERVICECALL_TIMER = 2000;
var TARGET_FRAMERATE = 60;

var nImagesToLoad = 3;
var nImagesLoaded = 0;

function HoneyHuntersGame () {
  this.oRes = new ResourceConfig();
  
  this.boardWidth = 13;
  this.boardHeight = 13;
  this.board = new Array();
  this.previousBoard = new Array();
  this.boardCenters = new Array();
  
  this.gameId = null;
  this.localPlayerId = null;
  this.localPlayerScore = 0;
  this.remotePlayerScore = 0;
  this.localPlayerName = "";
  this.remotePlayerName = "";
  this.gameStart = false;
  this.gameover = false;
  this.winner = false;
  this.totalHoney = 0;
  
  this.nScaleFactor = 0.3;
  this.imgCellEmpty = new Image();
  this.imgCellHoney = new Image();
  this.imgCellHidden = new Image();
  
  this.screenWidth = 0;
  this.screenHieght = 0;
  
  this.lastFrame = 0;
  
  this.clickQueue = new Array();

  this.initIntervalId = 0;  
  this.intervalId = 0;
  
  this.serviceUrl = "http://nonegames.appspot.com/HH";
  this.lastServiceCall = 0;
  this.ctx = null;
}

HoneyHuntersGame.prototype.enqueueClick = function(item) {
  this.clickQueue.push(item);
}

HoneyHuntersGame.prototype.dequeueClick = function() {
  return this.clickQueue.shift();
}

HoneyHuntersGame.prototype.initGame = function() {
  this.loadResources();
  
  this.initIntervalId = setInterval(function (ctx) {ctx.finishInitGame()}, 50, this);  
}

HoneyHuntersGame.prototype.finishInitGame = function() {                  
  if (nImagesLoaded == nImagesToLoad) {
    this.loadEnvironmentData();
    this.loadGameData();
    this.addControls();
    
    clearInterval(this.initIntervalId);
    
    this.wireEvents();
  }
}

HoneyHuntersGame.prototype.imageLoaded = function() {
  nImagesLoaded++;
}

HoneyHuntersGame.prototype.loadResources = function() {
  this.imgCellEmpty.onload = this.imageLoaded;
  this.imgCellEmpty.src = this.oRes.imgCellEmpty;
  this.imgCellHoney.onload = this.imageLoaded; 
  this.imgCellHoney.src = this.oRes.imgCellHoney;
  this.imgCellHidden.onload = this.imageLoaded;
  this.imgCellHidden.src = this.oRes.imgCellHidden;
}

HoneyHuntersGame.prototype.loadEnvironmentData = function() {
  var canvas = document.getElementById('honeyHuntersCanvas');
  if (!canvas) { alert("Honey Hunters Canvas element not found on page."); }
  this.ctx = canvas.getContext('2d'); 
  
  this.screenWidth = parseInt($("#honeyHuntersCanvas").attr("width"));
  this.screenHeight = parseInt($("#honeyHuntersCanvas").attr("height"));
}

HoneyHuntersGame.prototype.loadGameData = function() {  
  var cellWidth = this.imgCellEmpty.width * this.nScaleFactor;
  var cellHeight = this.imgCellEmpty.height * this.nScaleFactor;
  var cellCenterX = 0;
  var cellCenterY = 0;
  
  for (var i=0; i<this.boardWidth; i++) {
    this.boardCenters[i] = new Array();
    for (var j=0; j<this.boardHeight; j++) {
      cellCenterX = cellWidth * (i * 0.75 + 0.5);
      cellCenterY = cellHeight * (j + 0.5);
      if (!(i % 2)) {
        cellCenterY += 0.5 * cellHeight;
      }
      this.boardCenters[i][j] = {"x":cellCenterX, "y":cellCenterY}; 
    }
  }
}

lineLength = function(x, y, x0, y0){
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};

HoneyHuntersGame.prototype.findNearestCenter = function(x, y) {
  var best;
  var minDistance = Number.MAX_VALUE;
  var dist;
  for (var i=0; i<this.board.length; i++) {
    for (var j=0; j<this.board[i].length; j++) {
      dist = lineLength(x, y, this.boardCenters[i][j].x, this.boardCenters[i][j].y);
      if (dist < minDistance) {
        minDistance = dist;
        best = {"x":i, "y":j};
      }
    }
  }
  
  return best;
}

HoneyHuntersGame.prototype.onClick = function(e) {
  this.enqueueClick({"x":e.offsetX, "y":e.offsetY});
}

HoneyHuntersGame.prototype.wireEvents = function() {
  $("#honeyHuntersCanvas").bind('click', jQuery.proxy(this, 'onClick'));
  $("#startButton").bind('click', jQuery.proxy(this, 'startGame'));
  
  $("#gameName").bind('keyup', jQuery.proxy(this, 'onKeyup'));
  $("#playerName").bind('keyup', jQuery.proxy(this, 'onKeyup'));
  
  $("#gameName").focus();
}

HoneyHuntersGame.prototype.onKeyup = function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { //Enter keycode
    $("#gameName").unbind();
    $("#playerName").unbind();
    this.startGame(e);
  }
  
}

HoneyHuntersGame.prototype.addControls = function() {
  var cp = $("#controlPanel");
}

HoneyHuntersGame.prototype.getGameState = function() {
  var srv = new HHService(this.serviceUrl, this.gameId);
  var gameData = srv.getGameState(this.localPlayerId);

  if (gameData.GameStatus == true) {
    this.board = gameData.Board;
    this.gameStart = gameData.GameStart;
    this.localPlayersTurn = gameData.Turn;
    this.localPlayerScore = gameData.PlayerScore;
    this.remotePlayerScore = gameData.OpponentScore;
    this.localPlayerName = gameData.PlayerName;
    this.remotePlayerName = gameData.OpponentName;
    this.gameover = gameData.GameOver;
    this.winner = gameData.Winner;
    this.totalHoney = gameData.TotalHoney;
  }

  if (gameData.GameStatus == false) {
    var msg = "Something be broke on the game. Sorry!";
    this.endGame(msg);
  }
}

HoneyHuntersGame.prototype.endGame = function(msg) {
  clearInterval(this.intervalId);
  alert(msg);
}

HoneyHuntersGame.prototype.checkForGameStart = function() {
  while (this.clickQueue.length > 0) {
    var throwaway = this.dequeueClick();
  }
  this.getGameState();
}

HoneyHuntersGame.prototype.playersTurn = function() {
  if (this.clickQueue.length > 0) {
    var clickLoc = this.dequeueClick();
    var hex = this.findNearestCenter(clickLoc.x,clickLoc.y);
    
    var srv = new HHService(this.serviceUrl, this.gameId);
    var response = srv.submitMove(this.localPlayerId, hex.x, hex.y);
    this.getGameState();
  }
}

HoneyHuntersGame.prototype.opponentsTurn = function() {
  while (this.clickQueue.length > 0) {
    var throwaway = this.dequeueClick();
  }
  var currentTime = new Date().getTime();
  var dt = currentTime - this.lastServiceCall;
  
  if (dt >= SERVICECALL_TIMER) {
    this.lastServiceCall = currentTime;
    
    this.getGameState();
  }
}

HoneyHuntersGame.prototype.update = function() {
  if (this.gameStart == false) {
    this.checkForGameStart();
  }     
  else {     
    if (this.localPlayersTurn) {
      this.playersTurn();
    }
    else {
      this.opponentsTurn();
    }
  } 
}
  
HoneyHuntersGame.prototype.draw = function() {
  var cellWidth = this.imgCellEmpty.width * this.nScaleFactor;
  var cellHeight = this.imgCellEmpty.height * this.nScaleFactor;
  var cellText = "";
  var fontSize = (cellHeight * 0.5);
  var cellX = 0;
  var cellY = 0;
  var cellImage;
  
  this.ctx.clearRect(0,0,this.screenWidth,this.screenHeight);
  this.ctx.font = fontSize + "px Comic Sans";
  for (var i=0; i<this.board.length; i++) {
    for (var j=0; j<this.board[i].length; j++) {
      cellX = i * cellWidth * 0.75 ;
      cellY = j * cellHeight;
      if (!(i % 2)) {
        cellY += 0.5 * cellHeight;
      }
      
      switch(this.board[i][j]) {
        case -2: cellImage = this.imgCellHidden;
          cellText = "";
          break;
        case -1: cellImage = this.imgCellHoney;
          cellText = "";
          break;
        default: cellImage = this.imgCellEmpty;
          cellText = this.board[i][j];
          break;
      }
      this.ctx.drawImage(cellImage, cellX, cellY, cellWidth, cellHeight);
      this.ctx.fillText(cellText, this.boardCenters[i][j].x - (fontSize*0.25), this.boardCenters[i][j].y + (fontSize*0.25))
    }
  }
  
  $("#playerOne")[0].innerHTML = this.localPlayerName;  
  $("#playerTwo")[0].innerHTML = (this.remotePlayerName != "" && this.remotePlayerName != null) ? this.remotePlayerName : "Opponent";
  $("#playerOneScore")[0].innerHTML = this.localPlayerScore;
  $("#playerTwoScore")[0].innerHTML = this.remotePlayerScore;
  $("#honey")[0].innerHTML = "You need " + (Math.floor(this.totalHoney / 2) + 1 - this.localPlayerScore) + " honey to win.";
  if (this.gameStart == false) {
    $("#gameMessage")[0].innerHTML = "Waiting for opponent to join game.<br/>Give your friend the game identifier.";
    $("#gameMessage")[0].style.fontWeight = "bold";
    $("#playerOne")[0].style.fontWeight = "normal";
    $("#playerTwo")[0].style.fontWeight = "normal";
  }
  else if (this.gameover == true){
    $("#gameMessage")[0].innerHTML = (this.winner) ? "Congratulations, you won!" : "You lost :(";
    $("#gameMessage")[0].style.fontWeight = "bold";
    $("#playerOne")[0].style.fontWeight = "normal";
    $("#playerTwo")[0].style.fontWeight = "normal";
    
    var msg = (this.winner) ? "Congratulations, you won!" : "You lost :(";
    this.endGame(msg);
  }
  else {
    $("#gameMessage")[0].innerHTML = (this.localPlayersTurn) ? "Your turn!" : "Waiting for opponent to move...";
    var boldPlayer = (this.localPlayersTurn) ? "#playerOne" : "#playerTwo";
    var normPlayer = (this.localPlayersTurn) ? "#playerTwo" : "#playerOne";
    $(boldPlayer)[0].style.fontWeight = "bold";
    $(normPlayer)[0].style.fontWeight = "normal";
  }
}

HoneyHuntersGame.prototype.startGame = function(e) {
  this.gameId = $("#gameName")[0].value;
  this.localPlayerName = $("#playerName")[0].value;
  
  var srv = new HHService(this.serviceUrl, this.gameId);
  var gameData = srv.setupGame(this.localPlayerName);
  if (gameData.Setup) {
    this.localPlayerId = gameData.PlayerId;
    $("#startButton").attr('disabled', true);
    this.intervalId = setInterval(function (ctx) {ctx.runGame()}, 1000/TARGET_FRAMERATE, this);
  }
  else
    alert("Game setup failed :(");
}

HoneyHuntersGame.prototype.runGame = function() {
  
  //while(1) {
    //var thisFrame = new Date().getTime();
    //var dt = thisFrame - this.lastFrame;
    
    //if (dt >= 1000/TARGET_FRAMERATE) {
  this.update();
  this.draw();
    //}
  //}
}