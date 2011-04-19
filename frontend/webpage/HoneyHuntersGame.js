/*$(window).ready(function() { 
  var game = new HoneyHuntersGame;
  game.initGame(); 
});*/
var SERVICECALL_TIMER = 2000;
var TARGET_FRAMERATE = 60;

function HoneyHuntersGame () {
  this.oRes = new ResourceConfig();
  
  this.boardWidth = 16;
  this.boardHeight = 16;
  this.board = new Array();
  this.previousBoard = new Array();
  this.boardCenters = new Array();
  
  this.gameId = null;
  this.localPlayerId = null;
  this.localPlayerName = null;
  this.remotePlayerId = null;
  this.remotePlayerName = null;
  
  this.nScaleFactor = 0.2;
  this.imgCellEmpty = new Image();
  this.imgCellHoney = new Image();
  this.imgCellHidden = new Image();
  this.nImagesToLoad = 3;
  this.nImagesLoaded = 0;
  
  this.screenWidth = 0;
  this.screenHieght = 0;
  
  this.lastFrame = 0;
  
  this.clickQueue = new Array();
  
  this.currentPlayer = 0;
  this.localPlayerScore = 0;
  this.remotePlayerScore = 0;
  
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
  this.loadEnvironmentData();
  this.loadResources();
  this.loadGameData();
  
  //while (this.nImagesToLoad < this.nImagesLoaded) { }
  
  this.addControls();
  this.wireEvents();
}

HoneyHuntersGame.prototype.imageLoaded = function() {
  this.nImagesLoaded++;
}

HoneyHuntersGame.prototype.loadResources = function() {
  this.imgCellEmpty.src = this.oRes.imgCellEmpty;
  this.imgCellEmpty.onload = this.imageLoaded; 
  this.imgCellHoney.src = this.oRes.imgCellHoney;
  this.imgCellHoney.onload = this.imageLoaded;
  this.imgCellHidden.src = this.oRes.imgCellHidden;
  this.imgCellHidden.onload = this.imageLoaded;
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
      //alert("i:" + i + " j:" + j + " x:" + cellCenterX + " y:" + cellCenterY);
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
  //alert(" x:" + e.offsetX + " y:" + e.offsetY); 
}

HoneyHuntersGame.prototype.wireEvents = function() {
  $("#honeyHuntersCanvas").bind('click', jQuery.proxy(this, 'onClick'));//this, this.onClick);
  $("#startButton").bind('click', jQuery.proxy(this, 'startGame'));//this, this.startGame);
}


HoneyHuntersGame.prototype.addControls = function() {
  var cp = $("#controlPanel");
}

HoneyHuntersGame.prototype.getGameState = function() {
  var srv = new HHService(this.serviceUrl, this.gameId);
  var gameData = srv.getGameState(this.localPlayerId);
  //alert("GameStatus: " + gameData.GameStatus);
  if (gameData.GameStatus == true) {
    this.board = gameData.Board;
    this.localPlayersTurn = gameData.Turn;
    this.localPlayerScore = gameData.PlayerScore;
    this.remotePlayerScore = gameData.OpponentScore;
  }
  else {
    clearInterval(this.intervalId);
    alert("Game could not be found");
  }
  //$("#gameMessage")[0].innerHTML = (this.localPlayersTurn) ? "Your turn!" : "Waiting for opponent to move...";
  //$("#gameMessage")[0].innerHTML += "\nGameStatus: " + gameData.GameStatus;
}

HoneyHuntersGame.prototype.update = function() {
       ///////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////
  if (this.localPlayersTurn) {
    if (this.clickQueue.length > 0) {
      var clickLoc = this.dequeueClick();
      var hex = this.findNearestCenter(clickLoc.x,clickLoc.y);
      //alert(" hex.x:" + hex.x + " hex.y:" + hex.y);
      
      var srv = new HHService(this.serviceUrl, this.gameId);
      var response = srv.submitMove(this.localPlayerId, hex.x, hex.y);
      //alert("MoveMade: " + response.MoveMade);
      this.getGameState();
    }
  }
  else {
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
  $("#gameMessage")[0].innerHTML = (this.localPlayersTurn) ? "Your turn!" : "Waiting for opponent to move...";
  
  var boldPlayer = (this.localPlayersTurn) ? "#playerOne" : "#playerTwo";
  var normPlayer = (this.localPlayersTurn) ? "#playerTwo" : "#playerOne";
  $(boldPlayer)[0].style.fontWeight = "bold";
  $(normPlayer)[0].style.fontWeight = "normal";
}

HoneyHuntersGame.prototype.startGame = function(e) {
  this.gameId = $("#gameName")[0].value;
  this.localPlayerName = $("#playerName")[0].value;
  
  var srv = new HHService(this.serviceUrl, this.gameId);
  var gameData = srv.setupGame(this.localPlayerName);
  if (gameData.Setup)
    this.localPlayerId = gameData.PlayerId;
  else
    alert("Game setup failed :(");
  
  this.intervalId = setInterval(function (ctx) {ctx.runGame()}, 1000/TARGET_FRAMERATE, this);
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