goog.provide('honeyhunters');

goog.require('goog.net.XhrIo');
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Polygon');
goog.require('lime.animation.MoveBy');
goog.require('lime.transitions.Dissolve');
goog.require('honeyhunters.HexBoardProto');

honeyhunters.BASE_SITE = "http://nonegames.appspot.com/HH";

honeyhunters.WIDTH = 640;
honeyhunters.HEIGHT = 960;

honeyhunters.gameId = false;
honeyhunters.playerId = false;

// entrypoint
honeyhunters.start = function(){
	honeyhunters.director = new lime.Director(document.body,honeyhunters.WIDTH,honeyhunters.HEIGHT);
	honeyhunters.loadMenu();
};

// load menu scene
honeyhunters.loadMenu = function() {
    var scene = new lime.Scene(),
	    layer = new lime.Layer().setPosition(honeyhunters.WIDTH * 39 / 100, 0);

	var page1 = new lime.Layer().setPosition(0, 430);
	layer.appendChild(page1);
	var moveRight = new lime.animation.MoveBy(-honeyhunters.WIDTH, 0).enableOptimizations();
	var moveLeft = new lime.animation.MoveBy(honeyhunters.WIDTH, 0).enableOptimizations();

	var btn = honeyhunters.makeButton('Play Quick Match').setPosition(0, 200);
	goog.events.listen(btn, 'click', function() {
	      honeyhunters.newGame();
	});
	page1.appendChild(btn);

	btn = honeyhunters.makeButton('Play with a friend').setPosition(0, 320);
	goog.events.listen(btn, 'click', function() {
	    page1.runAction(moveRight);
	});
	page1.appendChild(btn);

	btn = honeyhunters.makeButton('Help').setPosition(0, 440);
	//goog.events.listen(btn, 'click', function() {
	//    rb.loadHelpScene();
	//});
	page1.appendChild(btn);

    //second area that will slide in
    var page2 = new lime.Layer().setPosition(honeyhunters.WIDTH, 0);
    page1.appendChild(page2);

    var lbl = new lime.Label().setText('Play with a friend').setFontColor('#000').setFontSize(24).setPosition(0, 140);
    page2.appendChild(lbl);

	var gameName = "";
	
    btn = honeyhunters.makeButton('Host').setPosition(0, 200);
	goog.events.listen(btn, 'click', function() {
	    honeyhunters.gameId = prompt("Enter game to host.");
		honeyhunters.hostGame();
	});
	page2.appendChild(btn);

    btn = honeyhunters.makeButton('Join').setPosition(0, 320);
	goog.events.listen(btn, 'click', function() {
	    honeyhunters.gameId = prompt("Enter game to join.");
		honeyhunters.joinGame()
	});
	page2.appendChild(btn);

    btn = honeyhunters.makeButton('Back').setPosition(0, 440);
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
			alert("something failed");
		}
	});
};

honeyhunters.joinGame = function() {
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
			alert("something failed");
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
