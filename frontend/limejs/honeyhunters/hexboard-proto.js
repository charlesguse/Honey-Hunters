goog.provide('honeyhunters.HexBoardProto');

goog.require('goog.math.Coordinate');
goog.require('lime.Scene');

/**
 * Hex board scene for Honey Hunters game.
 * @constructor
 * @extends lime.Scene
 */
honeyhunters.HexBoard = function() {
	lime.Scene.call(this);
	
	this.initConstants();
	
	var x = this.determineXPosition();
    this.boardLayer = new lime.Layer().setPosition(x, honeyhunters.HEIGHT / 10).setOpacity(0);
    this.setupHexBoard();
	this.appendChild(this.boardLayer);
	
	this.uiLayer = new lime.Layer().setPosition(honeyhunters.WIDTH * 2.5 / 10, honeyhunters.HEIGHT * 6.3 / 10).setOpacity(0);
	this.setupUI();
	this.appendChild(this.uiLayer);
	
	this.boardLayer.runAction(new lime.animation.FadeTo(1));
	this.uiLayer.runAction(new lime.animation.FadeTo(1));
	
	this.updateHexBoardObject();
	lime.scheduleManager.scheduleWithDelay(this.updateHexBoardObject, this, 2000)
};
goog.inherits(honeyhunters.HexBoard, lime.Scene);

honeyhunters.HexBoard.prototype.initConstants = function() {
	this.HEX_SIDE_LENGTH = 20;

	this.NOT_VISIBLE_COLOR = "#93645A";
	this.SELECT_COLOR = "#00FF00";
	this.HONEY_COLOR = "#F2C45A";
	this.EMPTY_COLOR = "#808080";
	this.YOUR_COLOR = "#5E8C6A";
	this.OPPONENTS_COLOR = "#8C2318";

	this.NOT_VISIBLE_SPOT = -2;
	this.HONEY_SPOT = -1
	this.EMPTY_SPOT = 0;

	this.BOARD_SIZE_X = 13;
	this.BOARD_SIZE_Y = 13;
}

honeyhunters.HexBoard.prototype.determineXPosition = function(){
	var h = Math.cos(30 * (Math.PI/180)) * this.HEX_SIDE_LENGTH;
	var x = this.HEX_SIDE_LENGTH * this.BOARD_SIZE_X + h * (this.BOARD_SIZE_X);
	x = (honeyhunters.WIDTH - x) / 2;
	return x;
};

honeyhunters.HexBoard.prototype.setupUI= function(){
	var uiBox = new lime.RoundedRect().setSize(400,110).setRadius(5).setFill(this.EMPTY_COLOR).setPosition(120, 50).setOpacity(.5);
	this.uiLayer.appendChild(uiBox);
	
	var yourScoreContainer = new lime.RoundedRect().setSize(120,60).setRadius(10).setFill(this.YOUR_COLOR).setPosition(0, 60);
	this.uiLayer.appendChild(yourScoreContainer);
	
	var oppScoreContainer = new lime.RoundedRect().setSize(120,60).setRadius(10).setFill(this.OPPONENTS_COLOR).setPosition(120, 60);
	this.uiLayer.appendChild(oppScoreContainer);
	
	var honeyLeftContainer = new lime.RoundedRect().setSize(120,60).setRadius(10).setFill(this.HONEY_COLOR).setPosition(240, 60);
	this.uiLayer.appendChild(honeyLeftContainer);
};

honeyhunters.HexBoard.prototype.setupHexBoard = function(){
	this.display_board = new Array(this.BOARD_SIZE_X);
	this.board = new Array(this.BOARD_SIZE_X);
	this.previous_board = new Array(this.BOARD_SIZE_X);

	for (x = 0; x < this.BOARD_SIZE_X; x++)
	{
		this.display_board[x] = new Array(this.BOARD_SIZE_Y);
		this.board[x] = new Array(this.BOARD_SIZE_Y);
		this.previous_board[x] = new Array(this.BOARD_SIZE_Y);
		
		for (y = 0; y < this.BOARD_SIZE_Y; y++)
		{
			this.board[x][y] = this.NOT_VISIBLE_SPOT;
			this.previous_board[x][y] = this.NOT_VISIBLE_SPOT;
			
			this.display_board[x][y] = this.placeHexOfType(this.board[x][y], x, y);
			this.boardLayer.appendChild(this.display_board[x][y]);
		}
	}
};

honeyhunters.HexBoard.prototype.updateHexBoardObject = function(){
	var site = honeyhunters.BASE_SITE + "/Status/" + honeyhunters.gameId + "/" + honeyhunters.playerId
	
	goog.net.XhrIo.send(site, function(e) {
		var xhr = e.target;
		this.game_state = xhr.getResponseJson();
		
		if (this.game_state["GameStatus"])
		{
			this.updateBoard();
			this.updateUI();
		}
		
		if (this.game_state["Gameover"])
			lime.scheduleManager.unschedule(this.update);
  });
};

honeyhunters.HexBoard.prototype.updateBoard = function(){
	this.board = this.game_state["Board"]
	
	for (x = 0; x < this.BOARD_SIZE_Y; x++)
	{
		for (y = 0; y < this.BOARD_SIZE_Y; y++)
		{
			if (this.board[x][y] != this.previous_board[x][y])
			{
				this.boardLayer.removeChild(this.display_board[x][y]);
				this.display_board[x][y] = this.placeHexOfType(this.board[x][y], x, y);
				this.boardLayer.appendChild(this.display_board[x][y]);
				
				if (this.board[x][y] > this.EMPTY_SPOT)
					this.boardLayer.appendChild(this.placeEmptyHexLabel(this.board[x][y], x, y));
				
				this.previous_board[x][y] = this.board[x][y];
			}
		}
	}
};

honeyhunters.HexBoard.prototype.updateUI = function(){
	this.uiLayer.removeChild(this.turnLabel);
	if (!this.game_state["GameStart"])
	{
		this.turnLabel = new lime.Label().setText("Waiting for second player").setPosition(72,0);
	}
	else if (this.game_state["GameOver"])
	{
		if (this.game_state["Winner"])
			this.turnLabel = new lime.Label().setText("You win!").setPosition(0,0).setFontWeight('bold');
		else
			this.turnLabel = new lime.Label().setText("Opponent won").setPosition(32,0);
	}
	else
	{
		if (this.game_state["Turn"])
			this.turnLabel = new lime.Label().setText("Your turn").setPosition(0,0).setFontWeight('bold');
		else
			this.turnLabel = new lime.Label().setText("Opponent's turn").setPosition(32,0);
	}
	this.turnLabel.setFontSize(26).setSize(1000,0);
	this.uiLayer.appendChild(this.turnLabel);

	var pScore = this.game_state["PlayerScore"];
	this.uiLayer.removeChild(this.yourScoreLabel);
	this.yourScoreLabel = new lime.Label().setText("You: " + pScore).setFontSize(18).setPosition(0,60);
	this.uiLayer.appendChild(this.yourScoreLabel);
	
	var oScore = this.game_state["OpponentScore"];
	this.uiLayer.removeChild(this.opponentsScoreLabel);
	this.opponentsScoreLabel = new lime.Label().setText("Opponent: " + oScore).setFontSize(18).setPosition(120,60);
	this.uiLayer.appendChild(this.opponentsScoreLabel);
	
	var honeyLeft = this.game_state["TotalHoney"] - pScore - oScore;
	this.uiLayer.removeChild(this.honeyLeftLabel);
	this.honeyLeftLabel = new lime.Label().setText("Honey: " + honeyLeft).setFontSize(18).setPosition(240,60);
	this.uiLayer.appendChild(this.honeyLeftLabel);
};

honeyhunters.HexBoard.prototype.createHex = function(sideLength) {
	var c = sideLength;
	var a = c / 2.0;
	var b = Math.sin(60 * (Math.PI/180)) * c;	
	
	return new lime.Polygon().
		addPoints(0, b,
                      a, 0,
					  a+c, 0,
					  2 * c, b,
					  a + c, 2 * b,
					  a , 2 * b);
};

honeyhunters.HexBoard.prototype.getHexPosition = function(xArray, yArray) {
	var s = this.HEX_SIDE_LENGTH;
	var h = Math.cos(30 * (Math.PI/180)) * this.HEX_SIDE_LENGTH;
	
	var xPixel = xArray * 2 * h;
	var yPixel = yArray * (h + s) + h;
	
	if (xArray % 2 == 1)
		yPixel -= h;

	return new goog.math.Coordinate(xPixel, yPixel);
};

honeyhunters.HexBoard.prototype.placeHex = function(xArray,yArray) {
	var hex = this.createHex(this.HEX_SIDE_LENGTH);

	hexPosition = this.getHexPosition(xArray,yArray);
	
	hex.setPosition(hexPosition);
	
	return hex;
};

honeyhunters.HexBoard.prototype.placeNotVisibleHex = function(xArray,yArray) {
	var hex = this.placeHex(xArray,yArray);
	hex.setFill(this.NOT_VISIBLE_COLOR).setOpacity(.5);
	
	var t = hex;
	goog.events.listen(hex, ['mousedown', 'touchstart'], function(e) {
		// If the game status can not be determined or if it is not the players turn, or if the game is over, don't allow the player to click hexes
		if (this.game_state == undefined || !this.game_state["GameStatus"] || !this.game_state["Turn"] || this.game_state["GameOver"])
			return;
		
		hex.setFill(this.SELECT_COLOR);
		
		e.swallow('mousemove', function(e) {
			if (t.hitTest(e)) {
				hex.setFill(this.SELECT_COLOR);
			}
			else {
				hex.setFill(this.NOT_VISIBLE_COLOR);
			}
		});
		e.swallow('touchmove', function(e) {
			if (!t.hitTest(e)) {
				hex.setFill(this.NOT_VISIBLE_COLOR);
			}
		});
		e.swallow(['mouseup', 'touchend'], function(e) {
			if (t.hitTest(e)) {
				this.makeMove(xArray, yArray);
		   }
	   });
	});
	return hex;
};

honeyhunters.HexBoard.prototype.makeMove = function(xArray, yArray) {
	var site = honeyhunters.BASE_SITE + "/Move/" + honeyhunters.gameId + "/" + honeyhunters.playerId + "/" + xArray + "/" + yArray
	
	goog.net.XhrIo.send(site, function(e) {
		this.updateHexBoardObject();
	});
};

honeyhunters.HexBoard.prototype.placeEmptyHex = function(number, xArray, yArray) {
	var hex = this.placeHex(xArray,yArray);
	hex.setFill(this.EMPTY_COLOR);
	
	return hex;
};

honeyhunters.HexBoard.prototype.placeEmptyHexLabel = function(number, xArray, yArray) {
	var label = new lime.Label().setText(number).setFontColor('#FFFFFF').setFontSize(18);
	
	var labelSize = label.getSize();
	console.log(labelSize);
	var hexPosition = this.getHexPosition(xArray,yArray);
	
	var s = this.HEX_SIDE_LENGTH;
	var h = Math.cos(30 * (Math.PI/180)) * this.HEX_SIDE_LENGTH;
	
	var middle = h + s / 2;
	
	hexPosition.x += middle - labelSize.width;
	hexPosition.y += middle - labelSize.height / 2;
	
	label.setPosition(hexPosition);

	return label;
};

honeyhunters.HexBoard.prototype.placeHoneyHex = function(xArray,yArray) {
	var hex = this.placeHex(xArray,yArray);
	hex.setFill(this.HONEY_COLOR);
	
	return hex;
};

honeyhunters.HexBoard.prototype.placeHexOfType =  function(type, xArray,yArray) {
	var hex = false;
	
	switch(type)
	{
		case this.NOT_VISIBLE_SPOT:
			hex = this.placeNotVisibleHex(xArray, yArray);
			break;
		case this.HONEY_SPOT:
			hex = this.placeHoneyHex(xArray, yArray);
			break;
		default:
			hex = this.placeEmptyHex(type, xArray, yArray);
	}
	return hex;
};
