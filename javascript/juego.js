var Q = new Quintus({
	development : true
});

Q.include("Scenes, Sprites, 2D, Input, Anim, Touch");
Q.setup("juego");
Q.controls();

Q.load("mapa_escena1.tmx, mosaicos_escenario.png, mosaicos_mario_enano.png, mosaicos_enemigos_32x32.png, mosaicos_enemigos_32x46.png", function() {

	Q.sheet("escenario", "mosaicos_escenario.png", {
		tileH : 32,
		tileW : 32
	});

	Q.sheet("mario_enano", "mosaicos_mario_enano.png", {
		tileH : 30,
		tileW : 30
	});

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

	Q.stageScene("escena1");
});

Q.animations("mario_anim", {
	caminar : {
		frames : [4, 5, 8],
		rate : 1 / 6,
		loop : false
	},
	quieto : {
		frames : [1],
		rate : 1 / 2,
		loop : false
	},
	saltar : {
		frames : [2],
		rate : 1 / 2,
		loop : false
	}
});

Q.animations("goomba_anim", {
	caminar : {
		frames : [1, 0],
		rate : 1 / 4
	}
});

Q.animations("tortuga_verde_anim", {
	caminar : {
		frames : [0, 1],
		rate : 1 / 4,
		loop : false
	}
});

Q.Sprite.extend("Mario", {
	init : function(p) {

		this._super(p, {
			sheet : "mario_enano",
			sprite : "mario_anim",
			frame : 1,
			x : 100,
			y : 50,
			jumpSpeed : -500
		});

		this.add("2d, platformerControls, animation");

	},
	step : function() {

		if (this.p.vx > 0 && this.p.vy === 0) {

			this.p.flip = false;
			this.play("caminar");
		} else if (this.p.vx < 0 && this.p.vy === 0) {

			this.p.flip = "x";
			this.play("caminar");
		} else if (this.p.vx === 0 && this.p.vy === 0) {

			this.play("quieto");
		} else if (this.p.vy !== 0) {

			this.play("saltar");
		}

	}
});

Q.Sprite.extend("Goomba", {
	init : function(p) {

		this._super(p, {
			sheet : "enemigos_bajos",
			sprite : "goomba_anim",
			x : 110,
			y : 40,
			vx : 120,
			frame : 0,
			jumpSpeed : -300
		});

		this.add("2d, aiBounce, animation");
		this.play("caminar");
	}
});

Q.Sprite.extend("TortugaVerde", {
	init : function(p) {

		this._super(p, {
			sheet : "enemigos_altos",
			sprite : "tortuga_verde_anim",
			x : 180,
			y : 40,
			vx : 120,
			frame : 0,
			jumpSpeed : -300
		});

		this.add("2d, aiBounce,animation");
	},
	step : function() {

		if (this.p.vx > 0) {

			this.p.flip = "x";
			this.play("caminar");
		} else if (this.p.vx < 0) {

			this.p.flip = false;
			this.play("caminar");
		}
	}
});

Q.scene("escena1", function(stage) {

	var cielo = new Q.TileLayer({
		dataAsset : "mapa_escena1.tmx",
		layerIndex : 0,
		sheet : "escenario",
		type : Q.SPRITE_NONE
	});

	stage.insert(cielo);

	var nubes = new Q.TileLayer({
		dataAsset : "mapa_escena1.tmx",
		layerIndex : 1,
		sheet : "escenario",
		type : Q.SPRITE_NONE
	});
	stage.insert(nubes);

	var colisiones = new Q.TileLayer({
		dataAsset : "mapa_escena1.tmx",
		layerIndex : 2,
		sheet : "escenario"
	});
	stage.collisionLayer(colisiones);

	var mario = stage.insert(new Q.Mario({
		x : 300
	}));

	stage.add("viewport").follow(mario, {
		x : true,
		y : true
	}, {
		minX : 32,
		maxX : colisiones.p.w,
		minY : 0,
		maxY : colisiones.p.h
	});

	stage.insert(new Q.Goomba());
	stage.insert(new Q.TortugaVerde());

});
