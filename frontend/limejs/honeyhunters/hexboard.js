goog.provide('honeyhunters.HexBoard');

honeyhunters.HEX_SIDE_LENGTH = 20;

honeyhunters.DEFAULT_COLOR = "#BDB76B";
honeyhunters.SELECT_COLOR = "#00FF00";

honeyhunters.selected_tile = false;

/**
 * Hex board scene for Honey Hunters game.
 * @constructor
 * @extends lime.Scene
 */
honeyhunters.hexGame = function(){
	lime.Scene.call(this);

    //empty layer for contents
	//var backgroundLayer = new lime.Layer();
	
	//backgroundLayer.fill("#8B4513");
	
    var boardLayer = new lime.Layer().setPosition(0, honeyhunters.HEIGHT / 10);
    this.appendChild(boardLayer);

	honeyhunters.setupHexBoard(boardLayer);
}
goog.inherits(honeyhunters.hexGame, lime.Scene);

honeyhunters.setupHexBoard = function(layer){
	for (x=0;x<13;x++)
	{
		for (y=0;y<13;y++)
		{
			layer.appendChild(honeyhunters.placeClickableHex(x, y));
		}
	}
}

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
}

honeyhunters.placeHex = function(xArray,yArray) {
	var hex = honeyhunters.createHex(honeyhunters.HEX_SIDE_LENGTH);

	var s = honeyhunters.HEX_SIDE_LENGTH;
	var h = Math.cos(30 * (Math.PI/180)) * honeyhunters.HEX_SIDE_LENGTH;
	
	var xPixel = xArray * 2 * h;
	var yPixel = yArray * (h + s) + h;
	
	if (xArray % 2 == 1)
	{
		yPixel -= h;
	}
	
	hex.setPosition(xPixel,yPixel);
	
	return hex;
}

honeyhunters.placeClickableHex = function(xArray,yArray) {
	var hex = honeyhunters.placeHex(xArray,yArray)
	hex.setFill(honeyhunters.DEFAULT_COLOR);
	
	goog.events.listen(hex,['mousedown','touchstart'],function(e){
		if (honeyhunters.selected_tile == this)
			return;
		else if (honeyhunters.selected_tile != false)
			honeyhunters.selected_tile.setFill(honeyhunters.DEFAULT_COLOR);
		
        this.setFill(honeyhunters.SELECT_COLOR); // hex is colored to red when touched
		honeyhunters.selected_tile = this;
        
        //e.swallow(['mouseup','touchend','touchcancel'],function(){
        //    this.setFill(honeyhunters.DEFAULT_COLOR); // hex is colored back to green when interaction ends
        //});
    });
	
	return hex;
}