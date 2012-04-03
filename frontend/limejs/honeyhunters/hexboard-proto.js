goog.provide('honeyhunters.HexBoardProto');

goog.require('goog.math.Coordinate');
goog.require('lime.animation.ScaleBy');
goog.require('lime.Scene');

/**
 * Hex board scene for Honey Hunters game.
 * @constructor
 * @extends lime.Scene
 */
honeyhunters.HexBoard = function() {
	lime.Scene.call(this);
	
	this.initConstants();
	
	var x = this.determineBoardLayerXPosition();
    this.boardLayer = new lime.Layer().setPosition(0, 0).setOpacity(0);
	
	goog.events.listen(this.boardLayer,['mousedown','touchstart'],function(e){
		e.startDrag();
	});
	
    this.setupHexBoard();
	this.appendChild(this.boardLayer);
	
	this.uiLayer = new lime.Layer().setPosition(0, 0).setSize(honeyhunters.WIDTH, honeyhunters.HEIGHT).setOpacity(0);
	this.setupUI();
	this.appendChild(this.uiLayer);
	
	this.uiLayer.runAction(new lime.animation.FadeTo(1));
	this.boardLayer.runAction(new lime.animation.FadeTo(1));
	
	this.updateHexBoardObject();
	lime.scheduleManager.scheduleWithDelay(this.updateHexBoardObject, this, 2000)
};
goog.inherits(honeyhunters.HexBoard, lime.Scene);

honeyhunters.HexBoard.prototype.initConstants = function() {
	this.HEX_SIDE_LENGTH = 20;
	
	this.DRAGGABLE_PADDING = 100;

	this.UI_BOX_COLOR = "#A09A6D"
	
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
	
	this.hexH = Math.cos(30 * (Math.PI/180)) * this.HEX_SIDE_LENGTH;
	this.hexR = Math.sin(30 * (Math.PI/180)) * this.HEX_SIDE_LENGTH;
	this.hexA = this.HEX_SIDE_LENGTH / 2.0;
	this.hexB = Math.sin(60 * (Math.PI/180)) * this.HEX_SIDE_LENGTH;
}

honeyhunters.HexBoard.prototype.determineBoardLayerXPosition = function(){
	var x = this.HEX_SIDE_LENGTH * this.BOARD_SIZE_X + this.hexH * (this.BOARD_SIZE_X);
	x = (honeyhunters.WIDTH - x) / 2;
	return x;
};

honeyhunters.HexBoard.prototype.setupUI= function(){
	var y = parseInt(honeyhunters.WIDTH / 5.3333);
	console.log(y);
	var x = honeyhunters.WIDTH - y * 2;
	this.uiBox = new lime.RoundedRect().setSize(x,y).setRadius(5).setFill(this.UI_BOX_COLOR);
	this.uiBox.setPosition(this.uiBox.getSize().width / 2, honeyhunters.HEIGHT - this.uiBox.getSize().height * .5);
	this.uiLayer.appendChild(this.uiBox);
	
	this.setupZoomOut();	
	this.setupZoomIn();
	
	this.yourScoreContainer = new lime.RoundedRect().setSize(y, y / 2).setRadius(10).setFill(this.YOUR_COLOR);
	this.yourScoreContainer.setPosition(this.yourScoreContainer.getSize().width * -1,0);
	this.uiBox.appendChild(this.yourScoreContainer);
	
	this.oppScoreContainer = new lime.RoundedRect().setSize(y, y / 2).setRadius(10).setFill(this.OPPONENTS_COLOR);
	this.oppScoreContainer.setPosition(this.oppScoreContainer.getSize().width * 0, 0);
	this.uiBox.appendChild(this.oppScoreContainer);
	
	this.honeyToWinContainer = new lime.RoundedRect().setSize(y, y / 2).setRadius(10).setFill(this.HONEY_COLOR);
	this.honeyToWinContainer.setPosition(this.honeyToWinContainer.getSize().width * 1, 0);
	this.uiBox.appendChild(this.honeyToWinContainer);
};

honeyhunters.HexBoard.prototype.setupZoomOut = function(){
	var zoomOut = new lime.animation.ScaleBy(.666667).setDuration(.2).enableOptimizations();
	var board = this;
	
	var size = this.uiBox.getSize().height;
	var btn = new lime.GlossyButton('-').setSize(size, size).setColor("#88A65E").setPosition(this.uiBox.getPosition().x + this.uiBox.getSize().width / 2 + size / 2, this.uiBox.getPosition().y);
	goog.events.listen(btn, 'click', function() {
	      board.boardLayer.runAction(zoomOut);
		  board.setupZoomOut();
	});
	this.uiLayer.appendChild(btn);
	this.uiLayer.removeChild(this.zoomOutButton);
	this.zoomOutButton = btn;
};

honeyhunters.HexBoard.prototype.setupZoomIn = function(){
	var zoomIn = new lime.animation.ScaleBy(1.5).setDuration(.2).enableOptimizations();
	var board = this;
	
	var size = this.uiBox.getSize().height;
	var btn = new lime.GlossyButton('+').setSize(size, size).setColor("#88A65E").setPosition(this.uiBox.getPosition().x + this.uiBox.getSize().width / 2 + size * 3 / 2, this.uiBox.getPosition().y);
	goog.events.listen(btn, 'click', function() {
	      board.boardLayer.runAction(zoomIn);
		  board.setupZoomIn();
	});
	this.uiLayer.appendChild(btn);
	this.uiLayer.removeChild(this.zoomInButton);
	this.zoomInButton = btn;
};

honeyhunters.HexBoard.prototype.setupHexBoard = function(){
	this.display_board = new Array(this.BOARD_SIZE_X);
	this.board = new Array(this.BOARD_SIZE_X);
	this.previous_board = new Array(this.BOARD_SIZE_X);
	
	
	var topLeftX = -this.DRAGGABLE_PADDING;
	var topLeftY = -this.DRAGGABLE_PADDING;
	var bottomRightX = (this.hexR + this.HEX_SIDE_LENGTH) * this.BOARD_SIZE_X + this.hexR + this.DRAGGABLE_PADDING * 2;
	var bottomRightY = this.hexH * 2 * this.BOARD_SIZE_Y + this.DRAGGABLE_PADDING * 2;
	
	var blah = new lime.Polygon().
						addPoints(topLeftX, topLeftY,
									bottomRightX, topLeftY,
									bottomRightX, bottomRightY,
									topLeftX, bottomRightY);
					  
	//blah.setFill("#FF0");
	this.boardLayer.appendChild(blah);

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
	var board = this;
	
	goog.net.XhrIo.send(site, function(e) {
		var xhr = e.target;
		board.game_state = xhr.getResponseJson();
		
		if (board.game_state["GameStatus"])
		{
			board.updateUI();
			board.updateBoard();
		}
		
		if (board.game_state["Gameover"])
			lime.scheduleManager.unschedule(board.updateHexBoardObject);
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
	var newTurnLabel = this.turnLabel;
	
	if (!this.game_state["GameStart"])
	{
		newTurnLabel = new lime.Label().setText("Waiting for second player");
	}
	else if (this.game_state["GameOver"])
	{
		if (this.game_state["Winner"])
			newTurnLabel = new lime.Label().setText("You win!").setFontWeight('bold');
		else
			newTurnLabel = new lime.Label().setText("Opponent won");
	}
	else
	{
		if (this.game_state["Turn"])
			newTurnLabel = new lime.Label().setText("Your turn").setFontWeight('bold');
		else
			newTurnLabel = new lime.Label().setText("Opponent's turn");
	}
	newTurnLabel.setAnchorPoint(0,0);
	newTurnLabel.setPosition(this.yourScoreContainer.getPosition().x, -this.uiBox.getSize().height/2)
	newTurnLabel.setFontSize(26).setSize(1000,0).setOpacity(1);
	this.uiBox.appendChild(newTurnLabel);
	this.uiBox.removeChild(this.turnLabel);
	this.turnLabel = newTurnLabel;

	var pScore = this.game_state["PlayerScore"];
	var newYourScoreLabel = new lime.Label().setText("You: " + pScore).setFontSize(18);//.setPosition(0,60);
	this.yourScoreContainer.appendChild(newYourScoreLabel);
	this.yourScoreContainer.removeChild(this.yourScoreLabel);
	this.yourScoreLabel = newYourScoreLabel;	
	
	var oScore = this.game_state["OpponentScore"];
	var newOpponentsScoreLabel = new lime.Label().setText("Opponent: " + oScore).setFontSize(18);//.setPosition(120,60);
	this.oppScoreContainer.appendChild(newOpponentsScoreLabel);
	this.oppScoreContainer.removeChild(this.opponentsScoreLabel);
	this.opponentsScoreLabel = newOpponentsScoreLabel
	
	var honeyToWin = parseInt(this.game_state["TotalHoney"] / 2) + 1;
	var newHoneyToWinLabel = new lime.Label().setText("To Win: " + honeyToWin).setFontSize(18);//.setPosition(240,60);
	this.honeyToWinContainer.appendChild(newHoneyToWinLabel);
	this.honeyToWinContainer.removeChild(this.honeyToWinLabel);
	this.honeyToWinLabel = newHoneyToWinLabel;
};

honeyhunters.HexBoard.prototype.checkIfUIHit = function(e) {
	var totalNodes = this.uiLayer.getNumberOfChildren();
	console.log("Total Nodes: " + totalNodes);
	console.log(this.uiLayer);
	for (i = 0; i < totalNodes; i++)
	{
		if(this.uiLayer.getChildAt(i).hitTest(e))
			return true;
	}
	return false;
};

honeyhunters.HexBoard.prototype.createHex = function() {
	var c = this.HEX_SIDE_LENGTH;
	
	return new lime.Polygon().
		addPoints(0, this.hexB,
                      this.hexA, 0,
					  this.hexA + c, 0,
					  2 * c, this.hexB,
					  this.hexA + c, 2 * this.hexB,
					  this.hexA , 2 * this.hexB);
};

honeyhunters.HexBoard.prototype.getHexPosition = function(xArray, yArray) {
	var xPixel = xArray * 2 * this.hexH;
	var yPixel = yArray * (this.hexH + this.HEX_SIDE_LENGTH) + this.hexH;
	
	if (xArray % 2 == 1)
		yPixel -= this.hexH;

	return new goog.math.Coordinate(xPixel, yPixel);
};

honeyhunters.HexBoard.prototype.placeHex = function(xArray,yArray) {
	var hex = this.createHex();

	hexPosition = this.getHexPosition(xArray,yArray);
	
	hex.setPosition(hexPosition);
	
	return hex;
};

honeyhunters.HexBoard.prototype.placeNotVisibleHex = function(xArray,yArray) {
	var hex = this.placeHex(xArray,yArray);
	hex.setFill(this.NOT_VISIBLE_COLOR).setOpacity(.5);
	
	var board = this;
	goog.events.listen(hex, ['mousedown', 'touchstart'], function(e) {
		// If the game status can not be determined or if it is not the players turn, or if the game is over, don't allow the player to click hexes
		if (board.game_state == undefined || !board.game_state["GameStatus"] || !board.game_state["Turn"] || board.game_state["GameOver"] || board.checkIfUIHit(e))
			return;
		
		hex.setFill(board.SELECT_COLOR);
		
		e.swallow('mousemove', function(e) {
			//if (hex.hitTest(e)) {
			//	hex.setFill(board.SELECT_COLOR);
			//}
			//else {
			hex.setFill(board.NOT_VISIBLE_COLOR);
			//}
		});
		e.swallow('touchmove', function(e) {
			//if (!hex.hitTest(e)) {
			hex.setFill(board.NOT_VISIBLE_COLOR);
			//}
		});
		e.swallow(['mouseup', 'touchend'], function(e) {
			if (hex.getFill().str == board.SELECT_COLOR) {
				board.makeMove(xArray, yArray);
		   }
	   });
	});
	
	//goog.events.listen(this.boardLayer,['mousedown','touchstart'],function(e){
		// e.startDrag();
	// });
	
	return hex;
};

honeyhunters.HexBoard.prototype.makeMove = function(xArray, yArray) {
	var site = honeyhunters.BASE_SITE + "/Move/" + honeyhunters.gameId + "/" + honeyhunters.playerId + "/" + xArray + "/" + yArray
	
	var board = this;
	goog.net.XhrIo.send(site, function(e) {
		board.updateHexBoardObject();
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

	var hexPosition = this.getHexPosition(xArray,yArray);
	
	var middle = this.hexH + this.HEX_SIDE_LENGTH / 2;
	
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
