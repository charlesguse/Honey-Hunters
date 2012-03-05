goog.provide('honeyhunters.HexBoard');

goog.require('goog.math.Coordinate');

honeyhunters.HEX_SIDE_LENGTH = 20;

honeyhunters.NOT_VISIBLE_COLOR = "#BDB76B";
honeyhunters.SELECT_COLOR = "#00FF00";
honeyhunters.HONEY_COLOR = "#FFD700";
honeyhunters.EMPTY_COLOR = "#808080";
honeyhunters.YOUR_COLOR = "#87CEFA";
honeyhunters.OPPONENTS_COLOR = "#CD5C5C";

honeyhunters.NOT_VISIBLE_SPOT = -2;
honeyhunters.HONEY_SPOT = -1
honeyhunters.EMPTY_SPOT = 0;

honeyhunters.BOARD_SIZE_X = 13;
honeyhunters.BOARD_SIZE_Y = 13;

honeyhunters.boardLayer = false;
honeyhunters.uiLayer = false;
honeyhunters.yourScoreLabel = false;
honeyhunters.opponentsScoreLabel = false;
honeyhunters.honeyLeftLabel = false;
honeyhunters.turnLabel = false;
honeyhunters.display_board = false;
honeyhunters.game_state = false;
honeyhunters.board = false;
honeyhunters.previous_board = false;

honeyhunters.turn = true;

/**
 * Hex board scene for Honey Hunters game.
 * @constructor
 * @extends lime.Scene
 */
honeyhunters.HexBoard = function() {
	lime.Scene.call(this);
	
	var x = honeyhunters.determineXPosition();
    honeyhunters.boardLayer = new lime.Layer().setPosition(x, honeyhunters.HEIGHT / 10).setOpacity(0);
    honeyhunters.setupHexBoard();
	this.appendChild(honeyhunters.boardLayer);
	
	honeyhunters.uiLayer = new lime.Layer().setPosition(honeyhunters.WIDTH * 2.5 / 10, honeyhunters.HEIGHT * 6.3 / 10).setOpacity(0);
	honeyhunters.setupUI();
	this.appendChild(honeyhunters.uiLayer);
	
	honeyhunters.boardLayer.runAction(new lime.animation.FadeTo(1));
	honeyhunters.uiLayer.runAction(new lime.animation.FadeTo(1));
	
	honeyhunters.update();
	lime.scheduleManager.scheduleWithDelay(honeyhunters.update, this, 2000)
};
goog.inherits(honeyhunters.HexBoard, lime.Scene);

honeyhunters.determineXPosition = function(){
	var h = Math.cos(30 * (Math.PI/180)) * honeyhunters.HEX_SIDE_LENGTH;
	var x = honeyhunters.HEX_SIDE_LENGTH * honeyhunters.BOARD_SIZE_X + h * (honeyhunters.BOARD_SIZE_X);
	x = (honeyhunters.WIDTH - x) / 2;
	return x;
};

honeyhunters.setupUI= function(){
	var uiBox = new lime.RoundedRect().setSize(400,110).setRadius(5).setFill(honeyhunters.EMPTY_COLOR).setPosition(120, 50).setOpacity(.5);
	honeyhunters.uiLayer.appendChild(uiBox);
	
	var yourScoreContainer = new lime.RoundedRect().setSize(120,60).setRadius(10).setFill(honeyhunters.YOUR_COLOR).setPosition(0, 60);
	honeyhunters.uiLayer.appendChild(yourScoreContainer);
	
	var oppScoreContainer = new lime.RoundedRect().setSize(120,60).setRadius(10).setFill(honeyhunters.OPPONENTS_COLOR).setPosition(120, 60);
	honeyhunters.uiLayer.appendChild(oppScoreContainer);
	
	var honeyLeftContainer = new lime.RoundedRect().setSize(120,60).setRadius(10).setFill(honeyhunters.HONEY_COLOR).setPosition(240, 60);
	honeyhunters.uiLayer.appendChild(honeyLeftContainer);
};

honeyhunters.setupHexBoard = function(){
	honeyhunters.display_board = new Array(honeyhunters.BOARD_SIZE_X);
	honeyhunters.board = new Array(honeyhunters.BOARD_SIZE_X);
	honeyhunters.previous_board = new Array(honeyhunters.BOARD_SIZE_X);

	for (x = 0; x < honeyhunters.BOARD_SIZE_X; x++)
	{
		honeyhunters.display_board[x] = new Array(honeyhunters.BOARD_SIZE_Y);
		honeyhunters.board[x] = new Array(honeyhunters.BOARD_SIZE_Y);
		honeyhunters.previous_board[x] = new Array(honeyhunters.BOARD_SIZE_Y);
		
		for (y = 0; y < honeyhunters.BOARD_SIZE_Y; y++)
		{
			honeyhunters.board[x][y] = honeyhunters.NOT_VISIBLE_SPOT;
			honeyhunters.previous_board[x][y] = honeyhunters.NOT_VISIBLE_SPOT;
			
			honeyhunters.display_board[x][y] = honeyhunters.placeHexOfType(honeyhunters.board[x][y], x, y);
			honeyhunters.boardLayer.appendChild(honeyhunters.display_board[x][y]);
		}
	}
};

honeyhunters.update = function(){
	var site = honeyhunters.BASE_SITE + "/Status/" + honeyhunters.gameId + "/" + honeyhunters.playerId
	
	goog.net.XhrIo.send(site, function(e) {
		var xhr = e.target;
		honeyhunters.game_state = xhr.getResponseJson();
		
		if (honeyhunters.game_state["GameStatus"])
		{
			honeyhunters.updateBoard();
			honeyhunters.updateUI();
		}
		
		if (honeyhunters.game_state["Gameover"])
			lime.scheduleManager.unschedule(honeyhunters.update);
  });
};

honeyhunters.updateBoard = function(){
	honeyhunters.board = honeyhunters.game_state["Board"]
	
	for (x = 0; x < honeyhunters.BOARD_SIZE_Y; x++)
	{
		for (y = 0; y < honeyhunters.BOARD_SIZE_Y; y++)
		{
			if (honeyhunters.board[x][y] != honeyhunters.previous_board[x][y])
			{
				honeyhunters.boardLayer.removeChild(honeyhunters.display_board[x][y]);
				honeyhunters.display_board[x][y] = honeyhunters.placeHexOfType(honeyhunters.board[x][y], x, y);
				honeyhunters.boardLayer.appendChild(honeyhunters.display_board[x][y]);
				
				if (honeyhunters.board[x][y] > honeyhunters.EMPTY_SPOT)
					honeyhunters.boardLayer.appendChild(honeyhunters.placeEmptyHexLabel(honeyhunters.board[x][y], x, y));
				
				honeyhunters.previous_board[x][y] = honeyhunters.board[x][y];
			}
		}
	}
};

honeyhunters.updateUI = function(){
	honeyhunters.uiLayer.removeChild(honeyhunters.turnLabel);
	if (!honeyhunters.game_state["GameStart"])
	{
		honeyhunters.turnLabel = new lime.Label().setText("Waiting for second player").setPosition(72,0);
	}
	else if (honeyhunters.game_state["GameOver"])
	{
		if (honeyhunters.game_state["Winner"])
			honeyhunters.turnLabel = new lime.Label().setText("You win!").setPosition(0,0).setFontWeight('bold');
		else
			honeyhunters.turnLabel = new lime.Label().setText("Opponent won").setPosition(32,0);
	}
	else
	{
		if (honeyhunters.game_state["Turn"])
			honeyhunters.turnLabel = new lime.Label().setText("Your turn").setPosition(0,0).setFontWeight('bold');
		else
			honeyhunters.turnLabel = new lime.Label().setText("Opponent's turn").setPosition(32,0);
	}
	honeyhunters.turnLabel.setFontSize(26).setSize(1000,0);
	honeyhunters.uiLayer.appendChild(honeyhunters.turnLabel);

	var pScore = honeyhunters.game_state["PlayerScore"];
	honeyhunters.uiLayer.removeChild(honeyhunters.yourScoreLabel);
	honeyhunters.yourScoreLabel = new lime.Label().setText("You: " + pScore).setFontSize(18).setPosition(0,60);
	honeyhunters.uiLayer.appendChild(honeyhunters.yourScoreLabel);
	
	var oScore = honeyhunters.game_state["OpponentScore"];
	honeyhunters.uiLayer.removeChild(honeyhunters.opponentsScoreLabel);
	honeyhunters.opponentsScoreLabel = new lime.Label().setText("Opponent: " + oScore).setFontSize(18).setPosition(120,60);
	honeyhunters.uiLayer.appendChild(honeyhunters.opponentsScoreLabel);
	
	var honeyLeft = honeyhunters.game_state["TotalHoney"] - pScore - oScore;
	honeyhunters.uiLayer.removeChild(honeyhunters.honeyLeftLabel);
	honeyhunters.honeyLeftLabel = new lime.Label().setText("Honey: " + honeyLeft).setFontSize(18).setPosition(240,60);
	honeyhunters.uiLayer.appendChild(honeyhunters.honeyLeftLabel);
};

honeyhunters.createHex = function(sideLength) {
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

honeyhunters.getHexPosition = function(xArray, yArray) {
	var s = honeyhunters.HEX_SIDE_LENGTH;
	var h = Math.cos(30 * (Math.PI/180)) * honeyhunters.HEX_SIDE_LENGTH;
	
	var xPixel = xArray * 2 * h;
	var yPixel = yArray * (h + s) + h;
	
	if (xArray % 2 == 1)
		yPixel -= h;

	return new goog.math.Coordinate(xPixel, yPixel);
};

honeyhunters.placeHex = function(xArray,yArray) {
	var hex = honeyhunters.createHex(honeyhunters.HEX_SIDE_LENGTH);

	hexPosition = honeyhunters.getHexPosition(xArray,yArray);
	
	hex.setPosition(hexPosition);
	
	return hex;
};

honeyhunters.placeNotVisibleHex = function(xArray,yArray) {
	var hex = honeyhunters.placeHex(xArray,yArray);
	hex.setFill(honeyhunters.NOT_VISIBLE_COLOR);
	
	var t = hex;
	goog.events.listen(hex, ['mousedown', 'touchstart'], function(e) {
		// If the game status can not be determined or if it is not the players turn, or if the game is over, don't allow the player to click hexes
		if (honeyhunters.game_state == undefined || !honeyhunters.game_state["GameStatus"] || !honeyhunters.game_state["Turn"] || honeyhunters.game_state["GameOver"])
			return;
		
		hex.setFill(honeyhunters.SELECT_COLOR);
		
		e.swallow('mousemove', function(e) {
			if (t.hitTest(e)) {
				hex.setFill(honeyhunters.SELECT_COLOR);
			}
			else {
				hex.setFill(honeyhunters.NOT_VISIBLE_COLOR);
			}
		});
		e.swallow('touchmove', function(e) {
			if (!t.hitTest(e)) {
				hex.setFill(honeyhunters.NOT_VISIBLE_COLOR);
			}
		});
		e.swallow(['mouseup', 'touchend'], function(e) {
			if (t.hitTest(e)) {
				honeyhunters.makeMove(xArray, yArray);
		   }
	   });
	});
	return hex;
};

honeyhunters.makeMove = function(xArray, yArray) {
	var site = honeyhunters.BASE_SITE + "/Move/" + honeyhunters.gameId + "/" + honeyhunters.playerId + "/" + xArray + "/" + yArray
	
	goog.net.XhrIo.send(site, function(e) {
		honeyhunters.update();
	});
};

honeyhunters.placeEmptyHex = function(number, xArray, yArray) {
	var hex = honeyhunters.placeHex(xArray,yArray);
	hex.setFill(honeyhunters.EMPTY_COLOR);
	
	return hex;
};

honeyhunters.placeEmptyHexLabel = function(number, xArray, yArray) {
	var label = new lime.Label().setText(number).setFontColor('#FFFFFF').setFontSize(18);
	
	var labelSize = label.getSize();
	console.log(labelSize);
	var hexPosition = honeyhunters.getHexPosition(xArray,yArray);
	
	var s = honeyhunters.HEX_SIDE_LENGTH;
	var h = Math.cos(30 * (Math.PI/180)) * honeyhunters.HEX_SIDE_LENGTH;
	
	var middle = h + s / 2;
	
	hexPosition.x += middle - labelSize.width;
	hexPosition.y += middle - labelSize.height / 2;
	
	label.setPosition(hexPosition);

	return label;
};

honeyhunters.placeHoneyHex = function(xArray,yArray) {
	var hex = honeyhunters.placeHex(xArray,yArray);
	hex.setFill(honeyhunters.HONEY_COLOR);
	
	return hex;
};

honeyhunters.placeHexOfType =  function(type, xArray,yArray) {
	var hex = false;
	
	switch(type)
	{
		case honeyhunters.NOT_VISIBLE_SPOT:
			hex = honeyhunters.placeNotVisibleHex(xArray, yArray);
			break;
		case honeyhunters.HONEY_SPOT:
			hex = honeyhunters.placeHoneyHex(xArray, yArray);
			break;
		default:
			hex = honeyhunters.placeEmptyHex(type, xArray, yArray);
	}
	return hex;
};
