Q = new Quintus({
	development : true
});

Q.include("Sprites, Scenes, Input, 2D, Audio,Anim, Touch, UI");

Q.setup("juego");
Q.controls();
Q.touch();

Q.load("mosaicos_escenario.png, mapa_escena1_terminado.tmx, mosaicos_mario_enano.png, mosaicos_enemigos_32x32.png, mosaicos_enemigos_32x46.png", function() {

	//------- SOLUCION DEL EJERCICIO PARTE 1-----------------//
	Q.sheet("enemigos_bajos", "mosaicos_enemigos_32x32.png", {
		tileH : 32,
		tileW : 32
	});

	//------- SOLUCION DEL EJERCICIO PARTE 2-----------------//
	Q.sheet("enemigos_altos", "mosaicos_enemigos_32x46.png", {
		tileW : 32,
		tileH : 46,
	});

	Q.sheet("escenario", "mosaicos_escenario.png", {
		tileH : 32,
		tileW : 32
	});

	Q.sheet("mario_enano", "mosaicos_mario_enano.png", {
		tileH : 30,
		tileW : 30
	});

	Q.stageScene("escena1");
});

//------- SOLUCION DEL EJERCICIO PARTE 3-----------------//
Q.Sprite.extend("Goomba", {
	init : function(p) {

		this._super(p, {
			sheet : "enemigos_bajos",
			x : 180,
			y : 40,
			frame : 0,
			jumpSpeed : -300
		});

		this.add("2d");
	}
});

//------- SOLUCION DEL EJERCICIO PARTE 4-----------------//
Q.Sprite.extend("TortugaVerde", {
	init : function(p) {

		this._super(p, {
			sheet : "enemigos_altos",
			x : 180,
			y : 40,
			frame : 0,
			jumpSpeed : -300
		});

		this.add("2d");
	}
});

//definimos al mario
Q.Sprite.extend("Mario", {
	init : function(p) {

		this._super(p, {
			sheet : "mario_enano",
			x : 140,
			y : 40,
			frame : 1,
			jumpSpeed : -300
		});

		this.add("2d,platformerControls");
	}
});

Q.scene("escena1", function(stage) {

	var paisajes = new Q.TileLayer({
		sheet : "escenario",
		dataAsset : "mapa_escena1_terminado.tmx",
		layerIndex : 0,
		type : Q.SPRITE_NONE
	});
	stage.insert(paisajes);

	var cielo = new Q.TileLayer({
		sheet : "escenario",
		dataAsset : "mapa_escena1_terminado.tmx",
		layerIndex : 1,
		type : Q.SPRITE_NONE
	});
	stage.insert(cielo);

	var colisiones = new Q.TileLayer({
		sheet : "escenario",
		dataAsset : "mapa_escena1_terminado.tmx",
		layerIndex : 2
	});

	stage.collisionLayer(colisiones);
	var mario = new Q.Mario();
	stage.insert(mario);

	//------- SOLUCION DEL EJERCICIO parte 5 ------------------------//
	//--------------------------------------------------------//
	stage.insert(new Q.Goomba());
	stage.insert(new Q.TortugaVerde());

});
