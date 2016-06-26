var colors=["#facade","#beefed","#afaded","#ffc966","#ff5050"];
var randColor=Math.floor(Math.random()*colors.length);
var w=450;
var h=550;


var levelData=[
        {
            misty:{x:-300,y:0,key:"misty"},
            playButton:{x:w-100,y:h/2,key:"playButton"}
            
        },
        {
            sirena:{x:100,y:100,key:"sirena"},
            background:{key:"water"},
            sceneText:"Gauhu si sirena, taotao Hagatna. \nLiving on a bautifil island. \nI love to swim",
            nextArrow:{x:w-50,y:h/2,key:"arrow"}
        },
        {
            background:{key:"ocean2"},
            jellyFish:{x:w,y:100,key:"jellyFish"},
            starFish:{x:100,y:h-100,key:"starFish"}
        }
    
    
    
    ];
    
    
//Global functions
var GetRandom = function(item){
    return Math.floor(Math.random()*item);
}

var gameState={
    
      init:function(currentLevel){
      this.currentLevel=this.currentLevel || 2;
      
      
      
       //Set the type of scaling to 'show all'
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          
        //Set the min and max width/height of the game
        this.game.scale.setMinMax(this.game.width/2,this.game.height/2,this.game.width*2,this.game.height*2);
          
        //Center the game on the screen
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
  },
    
    
    preload:function(){
        game.load.image("misty","assets/misty.png");
        game.load.image("playButton","assets/playButton.png");
        game.load.image("water","assets/water.png");
        game.load.image("arrow","assets/arrow.png");
        game.load.image("ocean","assets/ocean.png");
        game.load.image("ocean2","assets/ocean2.png");
        game.load.image("starFish","assets/starFish.png");
        
        game.load.audio("mistyIntro","assets/audio/mistyIntro.mp3");
        game.load.audio("imSirena","assets/audio/imSirena.mp3");
        game.load.audio("sirena1","assets/audio/sirena1.mp3");
        game.load.audio("sirena2","assets/audio/sirena2.mp3");
        game.load.audio("sirena3","assets/audio/sirena3.mp3");
        game.load.audio("sirenaScene2","assets/audio/sirenaScene2.mp3");
        
        
        game.load.spritesheet("sirena","assets/sirena_spritesheet.png",360,260);
        game.load.spritesheet("jellyFish","assets/jellyfish_spritesheet.png",323,295);
    },
    
    create:function(){
        
       
          
          
        
        //audio
        this.a_intro= game.add.audio("mistyIntro");
        this.a_imSirena= game.add.audio("imSirena");
        this.a_sirena1 =game.add.audio("sirena1");
        this.a_sirena2 =game.add.audio("sirena2");
        this.a_sirena3 =game.add.audio("sirena3");
        this.a_sirenaScene2 =game.add.audio("sirenaScene2");
        
        this.soundsArray=[this.a_intro,this.a_imSirena,this.a_sirena1,this.a_sirena2,this.a_sirena3,this.a_sirenaScene2];
        this.sirenaSoundArray=[this.a_imSirena,this.a_sirena1,this.a_sirena2,this.a_sirena3];
        
        //Draw the level 
        this.drawLevel();
    },
    
    nextState:function(){
        console.log("Going to next state");
        this.currentLevel++;
        this.checkIfSoundIsPlaying();
        this.game.state.start("game",true,false,this.currentLevel);
        
    },
    previousState:function(){
          console.log("Going to next state");
        this.currentLevel--;
        this.checkIfSoundIsPlaying();
        this.game.state.start("game",true,false,this.currentLevel);
    },
    
    drawLevel:function(){
        var level = levelData[this.currentLevel];
        if(this.currentLevel==0){
            //First Level
            game.stage.backgroundColor =colors[randColor];
            //Intro misty
            
            this.misty=game.add.sprite(level.misty.x,level.misty.y,level.misty.key);
            this.misty.alpha=0;
            this.game.add.tween(this.misty).to({alpha:1,x:0},500,Phaser.Easing.Exponential.Out,true);
            this.a_intro.play();
            
            //Play button
            this.playButton = game.add.button(level.playButton.x,level.playButton.y,level.playButton.key,this.nextState,this);
            this.playButton.anchor.setTo(0.5);
            var tween=this.game.add.tween(this.playButton.scale).to({x:1.3,y:1.3},1000,"Linear",true);
            tween.yoyo(1000).loop();
            
          
        }
        else if(this.currentLevel==1){
             //level2
             
             
             var background=this.game.add.sprite(0,0,level.background.key);
             var nextButton = game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key,this.nextState,this);
             nextButton.anchor.setTo(0.5);
             nextButton.scale.setTo(0.5);
                
             var previousButton = game.add.button(50,level.nextArrow.y,level.nextArrow.key,this.previousState,this);
             previousButton.anchor.setTo(0.5);
             previousButton.scale.setTo(0.5);
             previousButton.scale.x=-0.5;
             
             this.sirena = this.game.add.sprite(level.sirena.x,level.sirena.y,"sirena");
             this.sirena.scale.setTo(0.5);
             this.sirena.anchor.setTo(0.5);
             this.sirena.animations.add("happyFace",[3,4],2,true);
             this.sirena.animations.play("happyFace");
             this.a_sirenaScene2.play();
             
            //tween sirena
             var tween=game.add.tween(this.sirena).to({y:this.sirena.y+50},2000,Phaser.Easing.Quadratic.InOut,true,0,1000,true);
             this.sirena.inputEnabled=true;
             this.sirena.events.onInputDown.add(function(){
                 //this.sirena.frame=Math.floor(Math.random()*5);
                 this.sirena.frame=1;
                 //check if any sound is playing
                 //this.checkIfSoundIsPlaying();
                 var randomSound = GetRandom(this.sirenaSoundArray.length);
                 var temp=randomSound;
                 
                 while(randomSound==temp){
                     this.checkIfSoundIsPlaying();
                     randomSound=GetRandom(this.sirenaSoundArray.length);
                     this.playMyCharacterSound(this.sirenaSoundArray[randomSound]);
                     //temp=randomSound;
                 }
                     
                
             },this);
             
             //add text
             var sceneText=game.add.text(game.world.centerX,game.world.centerY+200,level.sceneText,{font:"25px Arial",fill:"#fff",align:"center"});
             sceneText.anchor.setTo(0.5);
             
        }else if(this.currentLevel==2){
            var canRotate=true;
            var background=this.game.add.sprite(0,0,level.background.key);
            var jellyFish = this.game.add.sprite(level.jellyFish.x,level.jellyFish.y,level.jellyFish.key);
            jellyFish.animations.add("swim",[0,4,8,4],5,true);
            jellyFish.animations.play("swim");
            jellyFish.scale.setTo(0.3);
            jellyFish.angle+=45
            game.add.tween(jellyFish).to({x:-200},7500,Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            
            var starFish = game.add.sprite(level.starFish.x,level.starFish.y,level.starFish.key);
            starFish.anchor.setTo(0.5);
            starFish.scale.setTo(0.7);
            starFish.inputEnabled=true;
            starFish.events.onInputDown.add(function(){
                 var starFishTween = game.add.tween(starFish).to({angle:360},2000,Phaser.Easing.Linear.None,false); 
                if(canRotate){
                    starFishTween.start();
                    canRotate=false;
                }
                
                starFishTween.onComplete.add(function(){
                    canRotate=true;
                },this);
              
            },this);
            game.add.tween(starFish).to({angle:360},2000,Phaser.Easing.Linear.None,true);
            
            
           // game.add.tween(sprite).to( { angle: 45 }, 2000, Phaser.Easing.Linear.None, true);
            
            
            
            
            
            
            
            
        }
    },//END DRAW LEVEL
    
    checkIfSoundIsPlaying:function(){
        this.soundsArray.forEach(function(element){
            if(element.isPlaying){
                element.stop();
            }
        },this);
    },//END CHECK IS SOUND IS PLAYING
    
    playMyCharacterSound:function(keyName){
        keyName.play();
        
    }
    
}




var game= new Phaser.Game(450,550,Phaser.AUTO);
game.state.add("game",gameState);
game.state.start("game");