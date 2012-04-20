goog.provide('honeyhunters');

goog.require('goog.net.XhrIo');
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Polygon');
goog.require('lime.animation.MoveBy');
goog.require('lime.transitions.Dissolve');
goog.require('honeyhunters.HexBoard');

//honeyhunters.BASE_SITE = "http://honey-hunters.appspot.com/HH";
honeyhunters.BASE_SITE = "http://localhost:8080/HH";

honeyhunters.LOW_RESOLUTION = 1;
honeyhunters.HIGH_RESOLUTION = 2;

//honeyhunters.RESOLUTION = honeyhunters.LOW_RESOLUTION;

honeyhunters.BUTTON_PADDING = 10;

honeyhunters.gameId = false;
honeyhunters.playerId = false;

// entrypoint
honeyhunters.start = function(resolution){
	//honeyhunters.RESOLUTION = typeof resolution !== 'undefined' ? resolution : honeyhunters.RESOLUTION;
	honeyhunters.setResolution();
	honeyhunters.director = new lime.Director(document.body, honeyhunters.WIDTH, honeyhunters.HEIGHT);
	honeyhunters.loadMenu();
};

honeyhunters.setResolution = function() {
	if (screen.width < 640 && screen.height < 960)
	{
		honeyhunters.RESOLUTION = honeyhunters.LOW_RESOLUTION;
		honeyhunters.WIDTH = 320;
		honeyhunters.HEIGHT = 480;
	}
	else
	{
		honeyhunters.RESOLUTION = honeyhunters.HIGH_RESOLUTION
		honeyhunters.WIDTH = 640;
		honeyhunters.HEIGHT = 960;
	}
}

// load menu scene
honeyhunters.loadMenu = function() {
    var scene = new lime.Scene();
	var layer = new lime.Layer().setPosition(honeyhunters.WIDTH / 2, 0);

	var page1 = new lime.Layer().setPosition(0, 0);
	layer.appendChild(page1);
	var moveRight = new lime.animation.MoveBy(-honeyhunters.WIDTH, 0).enableOptimizations();
	var moveLeft = new lime.animation.MoveBy(honeyhunters.WIDTH, 0).enableOptimizations();

	var btn = honeyhunters.makeButton('Play Quick Match');
	btn.setPosition(0, honeyhunters.HEIGHT - (btn.getSize().height + honeyhunters.BUTTON_PADDING) * 3);
	goog.events.listen(btn, 'click', function() {
	      honeyhunters.newGame();
	});
	page1.appendChild(btn);

	btn = honeyhunters.makeButton('Play with a friend');
	btn.setPosition(0, honeyhunters.HEIGHT - (btn.getSize().height + honeyhunters.BUTTON_PADDING) * 2);
	goog.events.listen(btn, 'click', function() {
	    page1.runAction(moveRight);
	});
	page1.appendChild(btn);

	btn = honeyhunters.makeButton('Help');
	btn.setPosition(0, honeyhunters.HEIGHT - (btn.getSize().height + honeyhunters.BUTTON_PADDING) * 1);
	//goog.events.listen(btn, 'click', function() {
	//    rb.loadHelpScene();
	//});
	page1.appendChild(btn);

    //second area that will slide in
    var page2 = new lime.Layer().setPosition(honeyhunters.WIDTH, 0);
    page1.appendChild(page2);

    var lbl = new lime.Label().setText('Play with a friend').setFontColor('#000').setFontSize(24);
	lbl.setPosition(0, honeyhunters.HEIGHT - (btn.getSize().height + honeyhunters.BUTTON_PADDING) * 4);
    page2.appendChild(lbl);

	var gameName = "";
	
    btn = honeyhunters.makeButton('Host');
	btn.setPosition(0, honeyhunters.HEIGHT - (btn.getSize().height + honeyhunters.BUTTON_PADDING) * 3);
	goog.events.listen(btn, 'click', function() {
	    honeyhunters.gameId = prompt("Enter game to host.");
		honeyhunters.hostGame();
	});
	page2.appendChild(btn);

    btn = honeyhunters.makeButton('Join');
	btn.setPosition(0, honeyhunters.HEIGHT - (btn.getSize().height + honeyhunters.BUTTON_PADDING) * 2);
	goog.events.listen(btn, 'click', function() {
	    honeyhunters.gameId = prompt("Enter game to join.");
		honeyhunters.joinGame()
	});
	page2.appendChild(btn);

    btn = honeyhunters.makeButton('Back');
	btn.setPosition(0, honeyhunters.HEIGHT - (btn.getSize().height + honeyhunters.BUTTON_PADDING) * 1);
	goog.events.listen(btn, 'click', function() {
	    page1.runAction(moveLeft);
	});
	page2.appendChild(btn);
	
	scene.appendChild(layer);

	honeyhunters.director.replaceScene(scene, lime.transitions.Dissolve);
};

honeyhunters.hostGame = function() {
	var site = honeyhunters.BASE_SITE + "/SetupHex/" + honeyhunters.gameId

	goog.net.XhrIo.send(site, function(e) {
		var xhr = e.target;
		var state = xhr.getResponseJson();
		
		if (state['Setup'])
		{
			honeyhunters.playerId = state['PlayerId'];
			honeyhunters.newGame();
		}
		else
		{
            if (state['Message'])
                alert(state['Message']);
            else
                alert("What did you break?! :(");
		}
	});
};

honeyhunters.joinGame = function() {
	var site = honeyhunters.BASE_SITE + "/JoinHex/" + honeyhunters.gameId

	goog.net.XhrIo.send(site, function(e) {
		var xhr = e.target;
		var state = xhr.getResponseJson();
		
		if (state['Setup'])
		{
			honeyhunters.playerId = state['PlayerId'];
			honeyhunters.newGame();
		}
		else
		{
			if (state['Message'])
                alert(state['Message']);
            else
                alert("What did you break?! :(");
		}
	});
};

// load new game scene
honeyhunters.newGame = function() {
    var scene = new honeyhunters.HexBoard();
	honeyhunters.director.replaceScene(scene, lime.transitions.Dissolve);
};

// helper for same size buttons
honeyhunters.makeButton = function(text) {
    var btn = new lime.GlossyButton(text).setSize(300, 90).setColor("#88A65E");
    return btn;
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('honeyhunters.start', honeyhunters.start);
