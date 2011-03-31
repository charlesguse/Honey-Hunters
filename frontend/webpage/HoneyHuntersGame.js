/*$(window).ready(function() { 
  var game = new HoneyHuntersGame;
  game.initGame(); 
});*/

function HoneyHuntersGame () {
  this.oRes = new ResourceConfig();
  this.oBoard = new Array();
  
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
  // build board
  // set player data
}

HoneyHuntersGame.prototype.runGame = function() {
  //this.ctx.clearRect(0,0,this.screenWidth,this.screenHeight);
  //this.ctx.save();
  var scaleFactor = 0.5;
  var cellWidth = this.imgCellEmpty.width * scaleFactor;
  var cellHeight = this.imgCellEmpty.height * scaleFactor;
  var cellX = 0;
  var cellY = 0;
  
  for (var i=0; i<9; i++) {
    for (var j=0; j<6; j++) {
      cellX = i * cellWidth * 0.75 ;
      cellY = j * cellHeight;
      if (!(i % 2)) {
        cellY += 0.5 * cellHeight;
      }
      this.ctx.drawImage(this.imgCellEmpty, cellX, cellY, cellWidth, cellHeight);
    }
  }
}