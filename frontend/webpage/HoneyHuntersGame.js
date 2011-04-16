/*$(window).ready(function() { 
  var game = new HoneyHuntersGame;
  game.initGame(); 
});*/

function HoneyHuntersGame () {
  this.oRes = new ResourceConfig();
  
  this.boardWidth = 16;
  this.boardHeight = 16;
  this.aBoard = new Array();
  this.aBoardCenters = new Array();
  
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
  
  this.currentPlayer = 0;
  
  this.serviceUrl = "http://nonegames.appspot.com/HH";
  this.ctx = null;
}

HoneyHuntersGame.prototype.initGame = function() {
  this.loadEnvironmentData();
  this.loadResources();
  this.loadGameData();
  
  while (this.nImagesToLoad < this.nImagesLoaded) { }
  
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
    this.aBoardCenters[i] = new Array();
    for (var j=0; j<this.boardHeight; j++) {
      cellCenterX = cellWidth * (i * 0.75 + 0.5);
      cellCenterY = cellHeight * (j + 0.5);
      if (!(i % 2)) {
        cellCenterY += 0.5 * cellHeight;
      }
      
      this.aBoardCenters[i][j] = {"x":cellCenterX, "y":cellCenterY}; 
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
  for (var i=0; i<this.aBoard.length; i++) {
    for (var j=0; j<this.aBoard[i].length; j++) {
      dist = lineLength(x, y, this.aBoardCenters[i][j].x, this.aBoardCenters[i][j].y);
      if (dist < minDistance) {
        minDistance = dist;
        best = {"x":i, "y":j};
      }
    }
  }
  
  return best;
}

HoneyHuntersGame.prototype.onClick = function(e) {
  var srv = new HHService(this.serviceUrl, this.gameId);
  var hex = this.findNearestCenter(e.offsetX,e.offsetY);
  var currentPlayerId = (this.localPlayersTurn) ? this.localPlayerId : this.remotePlayerId;
  var response = srv.submitMove(currentPlayerId, hex.x, hex.y);
  
  this.update();
  this.draw();
}

HoneyHuntersGame.prototype.wireEvents = function() {
  $("#honeyHuntersCanvas").bind('click', jQuery.proxy(this, 'onClick'));//this, this.onClick);
  $("#startButton").bind('click', jQuery.proxy(this, 'startGame'));//this, this.startGame);
}


HoneyHuntersGame.prototype.addControls = function() {
  var cp = $("#controlPanel");
}

HoneyHuntersGame.prototype.update = function() {
  var srv = new HHService(this.serviceUrl, this.gameId);
  var gameData = srv.getGameState(this.localPlayerId);
  
  this.aBoard = gameData.Board;
  this.localPlayersTurn = gameData.Turn;
  this.localPlayerScore = gameData.PlayerScore;
  this.remotePlayerScore = gameData.OpponentScore;
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
  for (var i=0; i<this.aBoard.length; i++) {
    for (var j=0; j<this.aBoard[i].length; j++) {
      cellX = i * cellWidth * 0.75 ;
      cellY = j * cellHeight;
      if (!(i % 2)) {
        cellY += 0.5 * cellHeight;
      }
      
      switch(this.aBoard[i][j]) {
        case -2: cellImage = this.imgCellHidden;
          cellText = "";
          break;
        case -1: cellImage = this.imgCellHoney;
          cellText = "";
          break;
        default: cellImage = this.imgCellEmpty;
          cellText = this.aBoard[i][j];
          break;
      }
      this.ctx.drawImage(cellImage, cellX, cellY, cellWidth, cellHeight);
      this.ctx.fillText(cellText, this.aBoardCenters[i][j].x - (fontSize*0.25), this.aBoardCenters[i][j].y + (fontSize*0.25))
    }
  }
  
  $("#playerOne")[0].innerHTML = this.localPlayerName;
  $("#playerTwo")[0].innerHTML = (this.remotePlayerName != "" && this.remotePlayerName != null) ? this.remotePlayerName : "Opponent";
  $("#playerOneScore")[0].innerHTML = this.localPlayerScore;
  $("#playerTwoScore")[0].innerHTML = this.remotePlayerScore;
}

HoneyHuntersGame.prototype.startGame = function(e) {
  this.gameId = $("#gameName")[0].value;
  this.localPlayerName = $("#playerName")[0].value;
  
  var srv = new HHService(this.serviceUrl, this.gameId);
  var gameData = srv.setupGame(this.localPlayerName);
  if (gameData.Setup)
    this.localPlayerId = gameData.PlayerId;
  else
    alert("Remote game setup failed");
    
  gameData = srv.setupGame();
  if (gameData.Setup)
    this.remotePlayerId = gameData.PlayerId;
  else
    alert("Second player setup failed");
  
  this.runGame();
}

HoneyHuntersGame.prototype.runGame = function() {
  this.update();
  
  this.draw();
}