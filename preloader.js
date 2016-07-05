var SirenaGame = SirenaGame || {};
SirenaGame.Preloader={

    
    preload:function(){
        
        this.game.stage.backgroundColor = "#4488AA";
        this.preloadBg = this.add.sprite(75,150, 'ibb2');
		this.preloadBar = this.add.sprite(75,150, 'ibb');
        
        
        //game.load.image("misty","assets/misty.png");
        this.game.load.image("playButton","assets/playButton.png");
        //game.load.image("water","assets/water.png");
        this.game.load.image("arrow","assets/arrow.png");
        //game.load.image("ocean","assets/ocean.png");
        //game.load.image("ocean2","assets/ocean2.png");
        //game.load.image("starFish","assets/starFish.png");
        this.game.load.image("bubble","assets/bubble1.png");
        this.game.load.image("islandBackground","assets/islandBackground.png");
        this.game.load.image("outdoor","assets/outdoor2.jpg");
        this.game.load.image("hut","assets/hut.png");
        this.game.load.image("log","assets/log.png");
        //game.load.image("beach","assets/beach.png");
        //game.load.image("beach2","assets/beach2.jpg");
        this.game.load.image("sirena1","assets/sirena1.png");
        this.game.load.image("sirena2","assets/sirena2.png");
        this.game.load.image("waterBackground","assets/waterBackground.jpg");
        this.game.load.image("dolphin1","assets/dolphin1.png");
        this.game.load.image("dolphin2","assets/dolphin2.png");
        this.game.load.image("dolphin3","assets/dolphin3.png");
        this.game.load.image("dolphin4","assets/dolphin4.png");
        this.game.load.image("dolphin5","assets/dolphin5.png");
        this.game.load.image("introBackground","assets/introBackground.jpg");
        this.game.load.image("atani","assets/atani.png");
        this.game.load.image("background2","assets/background2.png");
        this.game.load.image("moon","assets/moon.png");
        this.game.load.image("sun","assets/sun.png");
        this.game.load.image("mom","assets/mom.png");
        this.game.load.image("star","assets/star.png");
        
        
        
       // game.load.audio("s1","assets/audio/s1.mp3");//intro
       // game.load.audio("s2","assets/audio/s2.mp3");//scene2
       // game.load.audio("s3","assets/audio/s3.mp3");
       // this.game.load.audio("s4","assets/audio/s4.mp3");
        this.game.load.audio("s5","assets/audio/s5.mp3");
        //game.load.audio("awesome","assets/audio/awesome.mp3");
        //game.load.audio("good_job","assets/audio/good_job.mp3");
        //game.load.audio("almost_done","assets/audio/almost_done.mp3");
        //game.load.audio("yeah_you_did_it","assets/audio/yeah_you_did_it.mp3");
        
        this.game.load.audio("pop","assets/audio/sounds/pop.mp3");
        
        this.game.load.audio("one","assets/audio/one.mp3");
        this.game.load.audio("two","assets/audio/two.mp3");
        this.game.load.audio("three","assets/audio/three.mp3");
        this.game.load.audio("four","assets/audio/four.mp3");
        this.game.load.audio("five","assets/audio/five.mp3");
        
        //RAE
        this.game.load.audio("s1","assets/audio/raeS1.mp3");
        this.game.load.audio("s2","assets/audio/raeS2.mp3");
        this.game.load.audio("s3","assets/audio/raeS3.mp3");
        this.game.load.audio("s4","assets/audio/raeS4.mp3");
        this.game.load.audio("awesome","assets/audio/raeAwesome.mp3");
        this.game.load.audio("good_job","assets/audio/raeGoodJob.mp3");
        this.game.load.audio("almost_done","assets/audio/raeAlmostDone.mp3");
        this.game.load.audio("yeah_you_did_it","assets/audio/raeYeahYouDidIt.mp3");
        
        //game.load.spritesheet("sirena","assets/sirena_spritesheet.png",360,260);
        //game.load.spritesheet("jellyFish","assets/jellyfish_spritesheet.png",323,295);
        //game.load.spritesheet("duck","assets/duck_walk.png",64,68);
        this.game.load.spritesheet("squid","assets/squid_spritesheet.png",64,64);
        this.game.load.spritesheet("blueFish","assets/blueFish.png",167,125);
    },
    
    create:function(){
        this.game.state.start("game");
    }
    
    
};