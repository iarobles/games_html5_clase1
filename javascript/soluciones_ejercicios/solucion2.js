Q = new Quintus({
	development : true
});

Q.include("Sprites, Scenes, Input, 2D, Audio,Anim, Touch, UI");

Q.setup("juego");
Q.controls();
Q.touch();

Q.load("mosaicos_escenario.png, mapa_escena1_terminado.tmx, mosaicos_mario_enano.png, mosaicos_enemigos_32x32.png, mosaicos_enemigos_32x46.png", function() {

	Q.sheet("enemigos_bajos", "mosaicos_enemigos_32x32.png", {
		tileH : 32,
		tileW : 32
	});

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

Q.animations("mario_enano_anim", {
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
		rate : 1 / 2
	},
});

//---------- SO-------------------//
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

Q.Sprite.extend("Goomba", {
	init : function(p) {

		this._super(p, {
			sheet : "enemigos_bajos",
			sprite : "goomba_anim",
			vx : -120,
			x : 180,
			y : 40,
			frame : 0
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

		this.add("2d, aiBounce, animation");

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

Q.Sprite.extend("Mario", {
	init : function(p) {

		this._super(p, {
			sheet : "mario_enano",
			sprite : "mario_enano_anim",
			x : 140,
			y : 40,
			frame : 1,
			jumpSpeed : -450
		});

		this.add("2d,platformerControls,animation");
	},
	step : function() {

		if (this.p.vx > 0 && this.p.vy === 0) {

			this.p.flip = false;
			this.play("caminar");

		} else if (this.p.vx < 0 && this.p.vy === 0) {

			this.p.flip = "x";
			this.play("caminar");

		} else if (this.p.vx == 0 && this.p.vy === 0) {

			this.play("quieto");
		} else if (this.p.vy !== 0) {

			this.play("saltar");
		}
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
	stage.add("viewport").follow(mario, {
		x : true,
		y : true
	}, {
		minX : 35,
		minY : 0,
		maxX : colisiones.p.w-35,
		maxY : colisiones.p.h
	});

	var posicionPiso = colisiones.p.h - (32 * 4);

	stage.insert(new Q.Goomba({
		y : posicionPiso
	}));

	stage.insert(new Q.TortugaVerde({
		y : posicionPiso
	}));

});
