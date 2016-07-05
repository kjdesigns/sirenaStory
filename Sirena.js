var SirenaGame = SirenaGame || {};
SirenaGame.Sirena = function(game,x,y,key){
    Phaser.Sprite.call(this,game,x,y,key);
    
    this.game = game;
    
    this.emitter = game.add.emitter(0, 0, 200);

    this.emitter.makeParticles('bubble');
    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 0;
    this.emitter.gravity = 150;
    this.emitter.bounce.setTo(0.5, 0.5);
    
    this.game.add.existing(this);
};
SirenaGame.Sirena.prototype = Object.create(Phaser.Sprite.prototype);
SirenaGame.Sirena.prototype.constructor = SirenaGame.Sirena;

SirenaGame.Sirena.prototype.update=function(){
    this.particleBurst2();
};

SirenaGame.Sirena.prototype.particleBurst2=function(){

    this.emitter.x = this.x;
    this.emitter.y = this.y+200;
    this.emitter.start(true, 2000, null, 1);


};

