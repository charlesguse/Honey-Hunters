/*$(window).ready(function() { 
  var game = new HoneyHuntersGame;
  game.initGame(); 
});*/

function HoneyHuntersGame () {
  this.oRes = new ResourceConfig();
  this.aBoard = new Array();
  this.aBoardCenters = new Array();
  
  this.nScaleFactor = 1.0;
  this.imgCellEmpty = new Image();
  this.imgCellHoney = new Image();
  this.imgCellHidden = new Image();
  this.nImagesToLoad = 3;
  this.nImagesLoaded = 0;
  
  this.screenWidth = 0;
  this.screenHieght = 0;
  
  this.ctx = null;
}

HoneyHuntersGame.prototype.initGame = function() {
  this.loadResources();
  this.loadEnvironmentData();
  this.loadGameData();
  
  while (this.nImagesToLoad < this.nImagesLoaded) { }
  
  this.wireEvents();
  this.runGame();
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
  this.aBoard = [[-2,3,-1],[2,-1,-2],[-1,-2,3],[-2,4,-1]];
  this.aBoardCenters = [[],[],[],[]];
  
  var cellWidth = this.imgCellEmpty.width * this.nScaleFactor;
  var cellHeight = this.imgCellEmpty.height * this.nScaleFactor;
  var cellCenterX = 0;
  var cellCenterY = 0;
  for (var i=0; i<this.aBoard.length; i++) {
    for (var j=0; j<this.aBoard[i].length; j++) {
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
        best = {"i":i, "j":j};
      }
    }
  }
  
  return best;
}

HoneyHuntersGame.prototype.onClick = function(e) {
  var hex = e.data.findNearestCenter(e.offsetX,e.offsetY);
  var clickX = e.data.aBoardCenters[hex.i][hex.j].x;
  var clickY = e.data.aBoardCenters[hex.i][hex.j].y;
  e.data.ctx.fillRect(clickX-10, clickY-10, 20, 20);
}

HoneyHuntersGame.prototype.wireEvents = function() {
  $("#honeyHuntersCanvas").bind('click', this, this.onClick);
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
  //this.ctx.save();
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
}

HoneyHuntersGame.prototype.runGame = function() {
  this.draw();
}