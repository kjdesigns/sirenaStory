var SirenaGame = SirenaGame || {};
SirenaGame.game = new Phaser.Game(450,550,Phaser.AUTO);
SirenaGame.game.state.add("boot",SirenaGame.Boot);
SirenaGame.game.state.add("preload",SirenaGame.Preloader);
SirenaGame.game.state.add("game",SirenaGame.gameState);
SirenaGame.game.state.start("boot");