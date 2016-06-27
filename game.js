var colors=["#facade","#beefed","#afaded","#ffc966","#ff5050"];
var randColor=Math.floor(Math.random()*colors.length);
var w=450;
var h=550;
var hut;


var levelData=[
        {
            misty:{x:-300,y:0,key:"misty"},
            playButton:{x:w-100,y:h/2,key:"playButton"}
            
        },
        {
            sirena:{x:100,y:100,key:"sirena"},
            background:{key:"islandBackground"},
            sceneText:"Gauhu si sirena, taotao Hagatna. \nLiving on a bautifil island. \nI love to swim",
            nextArrow:{x:w-50,y:h/2,key:"arrow"},
            squid:[{x:100,y:h/2,key:"squid",frame:0},{x:w-75,y:h-100,key:"squid",frame:1},{x:w-150,y:h/2+75,key:"squid",frame:2}]
        },
        {
            background:{key:"ocean2"},
            jellyFish:{x:w,y:100,key:"jellyFish"},
            starFish:{x:100,y:h-100,key:"starFish"}
        },
        {
            background:{key:"outdoor"},
            hut:{x:100,y:h/2-50,key:"hut"},
            trash:[{x:40,y:h/2+20,key:"log"},{x:130,y:h/2+20},{x:160,y:350},{x:300,y:250}],
            sceneText:"Whenever I get a chance\nI would sneak away,\noften times i forget about my chores\nto go swimming",
            sceneText2:"Help with Sirena's chores\n and put the logs in the hut"
        }
    
    
    
    ];
    
    
//Global functions
var GetRandom = function(item){
    return Math.floor(Math.random()*item);
}

var gameState={
    
      init:function(currentLevel){
      this.currentLevel=this.currentLevel || 3;
      
      
       
        
      
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
        game.load.image("bubble","assets/bubble1.png");
        game.load.image("islandBackground","assets/islandBackground.png");
        game.load.image("outdoor","assets/outdoor2.jpg");
        game.load.image("hut","assets/hut.png");
        game.load.image("log","assets/log.png");
        
        
        game.load.audio("mistyIntro","assets/audio/mistyIntro.mp3");
        game.load.audio("imSirena","assets/audio/imSirena.mp3");
        game.load.audio("sirena1","assets/audio/sirena1.mp3");
        game.load.audio("sirena2","assets/audio/sirena2.mp3");
        game.load.audio("sirena3","assets/audio/sirena3.mp3");
        game.load.audio("sirenaScene2","assets/audio/sirenaScene2.mp3");
        game.load.audio("pop","assets/audio/sounds/pop.mp3");
        game.load.audio("wee","assets/audio/wee.mp3");
        game.load.audio("jellyFish","assets/audio/jellyFish.mp3");
        game.load.audio("duck","assets/audio/duck.mp3");
        game.load.audio("scene3","assets/audio/scene3.mp3");
        
        
        game.load.spritesheet("sirena","assets/sirena_spritesheet.png",360,260);
        game.load.spritesheet("jellyFish","assets/jellyfish_spritesheet.png",323,295);
        game.load.spritesheet("duck","assets/duck_walk.png",64,68);
        game.load.spritesheet("squid","assets/squid_spritesheet.png",64,64);
    },
    
    create:function(){
        
         //Start physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
   
          
          
        
        //audio
        this.a_intro= game.add.audio("mistyIntro");
        this.a_imSirena= game.add.audio("imSirena");
        this.a_sirena1 =game.add.audio("sirena1");
        this.a_sirena2 =game.add.audio("sirena2");
        this.a_sirena3 =game.add.audio("sirena3");
        this.a_sirenaScene2 =game.add.audio("sirenaScene2");
        this.a_pop =game.add.audio("pop");
        this.a_wee =game.add.audio("wee");
        this.a_wee.volume=0.2;
        this.a_jellyFish=game.add.audio("jellyFish");
        this.a_duck=game.add.audio("duck");
        this.a_scene3=game.add.audio("scene3");
        
        
        this.soundsArray=[this.a_intro,this.a_imSirena,this.a_sirena1,this.a_sirena2,this.a_sirena3,this.a_sirenaScene2,this.a_pop,this.a_wee,this.a_jellyFish,this.a_duck,this.a_scene3];
        this.sirenaSoundArray=[this.a_imSirena,this.a_sirena1,this.a_sirena2,this.a_sirena3];
        
        //Draw the level 
        this.drawLevel();
        
      
    },
    
    update:function(){
        if(this.currentLevel==3){
             game.physics.arcade.overlap(hut,this.logs,this.killLogs,null,this);
        }
       
   
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
             
             //loop through the data for all the squid
             this.squidsGroup=game.add.group();
             var squidSprite;
             var squidData = levelData[this.currentLevel].squid;
             if(squidData){
                 squidData.forEach(function(element){
                     squidSprite = game.add.sprite(element.x,element.y,element.key,element.frame);
                     squidSprite.inputEnabled=true;
                    
                     this.squidsGroup.add(squidSprite);
                    
                     
                 },this);
                 
             }
             
            
            //change the color of the squid when clicked
            this.squidsGroup.forEach(function(element){
                element.events.onInputDown.add(function(){
                    var frame=Math.floor((Math.random()*9)-1);
                    element.frame=frame;
                },this)
            },this);
             
            
             
        }else if(this.currentLevel==2){
            var canRotate=true;
            var background=game.add.sprite(0,0,level.background.key);
            background.inputEnabled=true;
            background.events.onInputDown.add(this.particleBurst,this);
            //play the scene audio
            this.a_scene3.play();
        
            //Emitter
        //   this.emitter = game.add.emitter(0,0,100);
        //   this.emitter.makeParticles("bubble");
        //   this.emitter.gravity=200;
        
        var scene3Text = game.add.text(100,100,"I love to swim in the ocean,\nhowever my favorite spot is the\nMinondo River",{font:"18px Arial",fill:"#fff",align:"center"});
            
            var jellyFish = this.game.add.sprite(level.jellyFish.x,level.jellyFish.y,level.jellyFish.key);
            jellyFish.animations.add("swim",[0,4,8,4],5,true);
            jellyFish.animations.play("swim");
            jellyFish.scale.setTo(0.3);
            jellyFish.angle+=45
            game.add.tween(jellyFish).to({x:-200},7500,Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            jellyFish.inputEnabled=true;
            jellyFish.events.onInputDown.add(function(){
              this.a_jellyFish.play();  
            },this);
            
            var starFish = game.add.sprite(level.starFish.x,level.starFish.y,level.starFish.key);
            starFish.anchor.setTo(0.5);
            starFish.scale.setTo(0.7);
            starFish.inputEnabled=true;
            starFish.events.onInputDown.add(function(){
                 var starFishTween = game.add.tween(starFish).to({angle:360},2000,Phaser.Easing.Linear.None,false); 
                if(canRotate){
                    starFishTween.start();
                    this.a_wee.play()
                    canRotate=false;
                }
                
                starFishTween.onComplete.add(function(){
                    canRotate=true;
                },this);
              
            },this);
            game.add.tween(starFish).to({angle:360},2000,Phaser.Easing.Linear.None,true);
            
            
           var duck = game.add.sprite(300,300,"duck");
           duck.animations.add("walk",[0,1,2,3,2,1,0,0],8,false);
           duck.inputEnabled=true;
           duck.animations.play("walk")
           duck.events.onInputDown.add(function(){
               if(canRotate){
                   duck.animations.play("walk");
                   this.a_duck.play();
                   canRotate=false;
               }
               
                this.game.time.events.add(1000,function(){
                        canRotate=true;
                  },this);
               
               
           },this);
        //   duck.animations.play("walk");
            
        
            
            
            
            
            
            
        }
        else if(this.currentLevel==3){
            //Scene4
            var background=game.add.sprite(0,0,level.background.key);
            hut=game.add.sprite(level.hut.x,level.hut.y,level.hut.key);
            game.physics.arcade.enable(hut);
            this.addQuake(hut);
            
            this.logs = game.add.group();
            var logSprite;
            level.trash.forEach(function(element){
                logSprite=game.add.sprite(element.x,element.y,"log");
                this.game.physics.arcade.enable(logSprite);
                logSprite.inputEnabled=true;
                logSprite.collideWorldBounds = true;
                logSprite.input.enableDrag(true);
                logSprite.body.setSize(25,25,25,25);
                
                this.logs.add(logSprite);
             
            },this);
            //add the text on the screen
            var style = {font:"18px Arial",fill:"#fff",align:"center"}
            var sceneText = game.add.text(w/2,h-50,level.sceneText,style);
            sceneText.anchor.setTo(0.5);
            
            var sceneText2 = game.add.text(w/2,50,level.sceneText2,{font:"18px Arial",fill:"#e50044",align:"center"});
            sceneText2.anchor.setTo(0.5)
            
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
        
    },
    particleBurst:function(event) {
        console.log("emitter started")
        var x = game.input.x;
        var y = game.input.y;
    
        var emitter = game.add.emitter(x,y,100);
        emitter.makeParticles("bubble");
        emitter.gravity=200;
        emitter.start(true, 2000, null, 10);
        this.a_pop.play();
        //if we want to collide emitter we need to do it in the update method
        //game.physics.arcade.collide(emitter);
    
    
    },
    addQuake:function(sprite){
        // define the camera offset for the quake
      var rumbleOffset = 10;
      
      // we need to move according to the camera's current position
      var properties = {
        x: sprite.x - rumbleOffset
      };
      
      // we make it a relly fast movement
      var duration = 100;
      // because it will repeat
      var repeat = 4;
      // we use bounce in-out to soften it a little bit
      var ease = Phaser.Easing.Bounce.InOut;
      var autoStart = false;
      // a little delay because we will run it indefinitely
      var delay = 1000;
      // we want to go back to the original position
      var yoyo = true;
      
      var quake = game.add.tween(sprite)
        .to(properties, duration, ease, autoStart, delay, 4, yoyo);
      
      // we're using this line for the example to run indefinitely
      quake.onComplete.addOnce(this.addQuake,this);
      
      // let the earthquake begins
      quake.start();
    },
    
    killLogs(house,log){
        log.kill();
    },
    
    render:function(){
       if(this.currentLevel==3){
             this.logs.forEach(function(element){
                     game.debug.body(element);
                 },this)
        }
        
        
       
    }

    
   
}




var game= new Phaser.Game(450,550,Phaser.AUTO);
game.state.add("game",gameState);
game.state.start("game");