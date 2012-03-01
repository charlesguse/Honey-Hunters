//set main namespace
goog.provide('honeyhunters');


//get requirements
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
//goog.require('lime.Circle');
//goog.require('lime.Label');
goog.require('lime.Polygon');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
//goog.require('lime.animation.MoveTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.transitions.Dissolve');
goog.require('honeyhunters.HexBoard');

//constant iPad size
honeyhunters.WIDTH = 720;
honeyhunters.HEIGHT = 1004;

// entrypoint
honeyhunters.start = function(){
	honeyhunters.director = new lime.Director(document.body,honeyhunters.WIDTH,honeyhunters.HEIGHT);
	honeyhunters.loadMenu();
}

// load menu scene
honeyhunters.loadMenu = function() {
    var scene = new lime.Scene(),
	    layer = new lime.Layer().setPosition(honeyhunters.WIDTH / 2, 0);

	//if(rb.isBrokenChrome()) layer.setRenderer(lime.Renderer.CANVAS);


	//var title = new lime.Sprite().setFill('assets/main_title.png').setPosition(0, 290);
	//title.qualityRenderer = true;
	//layer.appendChild(title);


	var page1 = new lime.Layer().setPosition(0, 430);
	layer.appendChild(page1);
	var moveRight = new lime.animation.MoveBy(-honeyhunters.WIDTH, 0).enableOptimizations();
	var moveLeft = new lime.animation.MoveBy(honeyhunters.WIDTH, 0).enableOptimizations();

	var btn = honeyhunters.makeButton('Play Quick Match').setPosition(0, 200);
	goog.events.listen(btn, 'click', function() {
	      honeyhunters.newGame();
	//    page1.runAction(moveRight);
	});
	page1.appendChild(btn);

	btn = honeyhunters.makeButton('Play with a friend').setPosition(0, 320);
	goog.events.listen(btn, 'click', function() {
	//    rb.usemode = rb.Mode.TIMED;
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
	    gameName=prompt("Enter game to host.");
	});
	page2.appendChild(btn);

    btn = honeyhunters.makeButton('Join').setPosition(0, 320);
	goog.events.listen(btn, 'click', function() {
	    gameName=prompt("Enter game to join.");
	});
	page2.appendChild(btn);

    btn = honeyhunters.makeButton('Back').setPosition(0, 440);
	goog.events.listen(btn, 'click', function() {
	    page1.runAction(moveLeft);
	});
	page2.appendChild(btn);


	var page3
	
	scene.appendChild(layer);
	//lime logo
	//honeyhunters.builtWithLime(scene);

	// set current scene active
	honeyhunters.director.replaceScene(scene, lime.transitions.Dissolve);
};

// load new game scene
honeyhunters.newGame = function() {
    var scene = new honeyhunters.hexGame();
	honeyhunters.director.replaceScene(scene, lime.transitions.Dissolve);
};

// helper for same size buttons
honeyhunters.makeButton = function(text) {
    var btn = new lime.GlossyButton(text).setSize(300, 90);
    return btn;
};



honeyhunters.oldStart = function(){

	var director = new lime.Director(document.body,1024,768),
	    scene = new lime.Scene(),

	    target = new lime.Layer().setPosition(512,384),
        circle = new lime.Circle().setSize(150,150).setFill(255,150,0),
        lbl = new lime.Label().setSize(160,50).setFontSize(30).setText('TOUCH ME!'),
        title = new lime.Label().setSize(800,70).setFontSize(60).setText('Now move me around!')
            .setOpacity(0).setPosition(512,80).setFontColor('#999').setFill(200,100,0,.1);


    //add circle and label to target object
    target.appendChild(circle);
    target.appendChild(lbl);

    //add target and title to the scene
    scene.appendChild(target);
    scene.appendChild(title);

	director.makeMobileWebAppCapable();

    //add some interaction
    goog.events.listen(target,['mousedown','touchstart'],function(e){

        //animate
        target.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.5).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.8)
        ));

        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        e.startDrag();

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            target.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(512,384)
            ));

            title.runAction(new lime.animation.FadeTo(0));
        });


    });

	// set current scene active
	director.replaceScene(scene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('honeyhunters.start', honeyhunters.start);
