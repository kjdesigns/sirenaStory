var SirenaGame = SirenaGame || {};
SirenaGame.Boot={
    preload:function(){
        
        this.game.load.image("ibb","assets/ibbturtle.png");
        this.game.load.image("ibb2","assets/ibbturtle2.png");
	
        
        
    },
    
    create:function(){

    	//Set the type of scaling to 'show all'
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          
        //Set the min and max width/height of the game
        this.game.scale.setMinMax(this.game.width/2,this.game.height/2,this.game.width*2,this.game.height*2);
          
        //Center the game on the screen
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        
        //Add physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start("preload")
    }
    
    
};