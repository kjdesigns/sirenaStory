var colors=["#facade","#beefed","#afaded","#ffc966","#ff5050"];
var randColor=Math.floor(Math.random()*colors.length);
var w=450;
var h=550;
var hut;
var numLogs=-1;
var numDolphin=5;


var levelData=[
        {
            atani:{x:-300,y:h/2-110,key:"atani"},
            playButton:{x:w-100,y:h/2,key:"playButton"},
            background:{key:"introBackground"}
            
        },
        {
            sirena:{x:100,y:200,key:"sirena2"},
            background:{key:"islandBackground"},
            sceneText:"Gauhu si sirena, taotao Hagatna. \nLiving on a bautifil island. \nI love to swim",
            nextArrow:{x:w-50,y:h/2,key:"arrow"},
            squid:[{x:150,y:h/2,key:"squid",frame:0},{x:w-75,y:h-100,key:"squid",frame:1},{x:w-150,y:h/2+75,key:"squid",frame:2}]
        },
        // {
        //     background:{key:"ocean2"},
        //     jellyFish:{x:w,y:100,key:"jellyFish"},
        //     starFish:{x:100,y:h-100,key:"starFish"},
        //      nextArrow:{x:w-50,y:h/2,key:"arrow"}
        // },
        {
            background:{key:"outdoor"},
            hut:{x:100,y:h/2-50,key:"hut"},
            trash:[{x:40,y:h/2+20,key:"log"},{x:130,y:h/2+20},{x:160,y:350},{x:300,y:250}],
            sceneText:"Whenever I get a chance\nI would sneak away,\noften times i forget about my chores\nto go swimming",
            sceneText2:"Help with Sirena's chores\n and put the logs in the hut",
            nextArrow:{x:w-50,y:h/2,key:"arrow"}
        },
        {
            background:{key:"waterBackground"},
            sceneText:"Being a young teen, I was really rebellous.\nI would rather swim than do anything else.\nOne day while doing chores,\nI had snuck away to go swimming",
            dolphin:[{x:75,y:200,key:"dolphin1"},{x:200,y:250,key:"dolphin2"},{x:300,y:300,key:"dolphin3"}/*gray*/,{x:20,y:400,key:"dolphin4"},{x:50,y:300,key:"dolphin5"}],
            nextArrow:{x:w-50,y:h/2,key:"arrow"}
            
        },
        {
            background:{key:"waterBackground"},
            sirena:{x:-10,y:150,key:"sirena2"},
            nextArrow:{x:w-50,y:h/2,key:"arrow"}
        }
    
    
    
    ];
    
    
//Global functions
var GetRandom = function(item){
    return Math.floor(Math.random()*item);
}

var gameState={
    
      init:function(currentLevel){
      this.currentLevel=this.currentLevel || 0;
      
      
       
        
      
       //Set the type of scaling to 'show all'
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          
        //Set the min and max width/height of the game
        this.game.scale.setMinMax(this.game.width/2,this.game.height/2,this.game.width*2,this.game.height*2);
          
        //Center the game on the screen
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        
        //Add physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },
    
    
    preload:function(){
        //game.load.image("misty","assets/misty.png");
        game.load.image("playButton","assets/playButton.png");
        //game.load.image("water","assets/water.png");
        game.load.image("arrow","assets/arrow.png");
        //game.load.image("ocean","assets/ocean.png");
        //game.load.image("ocean2","assets/ocean2.png");
        //game.load.image("starFish","assets/starFish.png");
        game.load.image("bubble","assets/bubble1.png");
        game.load.image("islandBackground","assets/islandBackground.png");
        game.load.image("outdoor","assets/outdoor2.jpg");
        game.load.image("hut","assets/hut.png");
        game.load.image("log","assets/log.png");
        //game.load.image("beach","assets/beach.png");
        //game.load.image("beach2","assets/beach2.jpg");
        game.load.image("sirena1","assets/sirena1.png");
        game.load.image("sirena2","assets/sirena2.png");
        game.load.image("waterBackground","assets/waterBackground.jpg");
        game.load.image("dolphin1","assets/dolphin1.png");
        game.load.image("dolphin2","assets/dolphin2.png");
        game.load.image("dolphin3","assets/dolphin3.png");
        game.load.image("dolphin4","assets/dolphin4.png");
        game.load.image("dolphin5","assets/dolphin5.png");
        game.load.image("introBackground","assets/introBackground.jpg");
        game.load.image("atani","assets/atani.png");
        
        
        
        game.load.audio("s1","assets/audio/s1.mp3");//intro
        game.load.audio("s2","assets/audio/s2.mp3");//scene2
        game.load.audio("s3","assets/audio/s3.mp3");
        game.load.audio("s4","assets/audio/s4.mp3");
        game.load.audio("s5","assets/audio/s5.mp3");
        game.load.audio("awesome","assets/audio/awesome.mp3");
        game.load.audio("good_job","assets/audio/good_job.mp3");
        game.load.audio("almost_done","assets/audio/almost_done.mp3");
        game.load.audio("yeah_you_did_it","assets/audio/yeah_you_did_it.mp3");
        
        game.load.audio("pop","assets/audio/sounds/pop.mp3");
        
        game.load.audio("one","assets/audio/one.mp3");
        game.load.audio("two","assets/audio/two.mp3");
        game.load.audio("three","assets/audio/three.mp3");
        game.load.audio("four","assets/audio/four.mp3");
        game.load.audio("five","assets/audio/five.mp3");
        
        
        //game.load.spritesheet("sirena","assets/sirena_spritesheet.png",360,260);
        //game.load.spritesheet("jellyFish","assets/jellyfish_spritesheet.png",323,295);
        //game.load.spritesheet("duck","assets/duck_walk.png",64,68);
        game.load.spritesheet("squid","assets/squid_spritesheet.png",64,64);
        game.load.spritesheet("blueFish","assets/blueFish.png",167,125);
    },
    
    create:function(){
        
         //Start physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
   
          
          
        
        //audio
        this.a_intro= game.add.audio("s1");
        this.a_s2 =game.add.audio("s2");
        this.a_s3=game.add.audio("s3");
        this.a_s4=game.add.audio("s4");
        this.a_s5=game.add.audio("s5");
        this.a_pop=game.add.audio("pop");
       
        
        //dolfin
        this.a_1 = this.game.add.audio("one");
        this.a_2 = this.game.add.audio("two");
        this.a_3 = this.game.add.audio("three");
        this.a_4 = this.game.add.audio("four");
        this.a_5 = this.game.add.audio("five");
        
        //log audio
        this.awesome=this.game.add.audio("awesome");
        this.good_job=this.game.add.audio("good_job");
        this.almost_done=this.game.add.audio("almost_done");
        this.yeah_you_did_it=this.game.add.audio("yeah_you_did_it");
        
        this.dolfinAudio = [this.a_5,this.a_4,this.a_3,this.a_2,this.a_1];
        this.logsAudio=[this.awesome,this.good_job,this.almost_done,this.yeah_you_did_it];
        
        
        this.soundsArray=[this.a_intro,this.a_s2,this.a_s3,this.a_s4,this.a_s5,this.a_5,this.a_4,this.a_3,this.a_2,this.a_1,this.a_pop];
        //this.sirenaSoundArray=[this.a_imSirena,this.a_sirena2,this.a_sirena3];
        
        //bubble emitter
        this.bubbleEmitter = game.add.emitter(0,0,50);
        this.bubbleEmitter.makeParticles("bubble");
        this.bubbleEmitter.setXSpeed(-100,0);
        this.bubbleEmitter.setYSpeed(0,0);
        this.bubbleEmitter.setRotation(0,0);
        this.bubbleEmitter.gravity=150;
        this.bubbleEmitter.bounce.setTo(0.5,0.5);
        
        
        //Draw the level 
        this.drawLevel();
        
      
    },
    
    update:function(){
       // if(this.currentLevel==3){
       //      game.physics.arcade.overlap(hut,this.logs,this.killLogs,null,this);
            //  if(this.logs.total==0){
            //      console.log("Hey no more logs");
            //  }
       // }
       
   
    },
    
    nextState:function(){
        console.log("Going to next state");
        numLogs=-1;
        numDolphin=5;
        this.currentLevel++;
        this.checkIfSoundIsPlaying();
        this.game.state.start("game",true,false,this.currentLevel);
        
        
    },
    previousState:function(){
          console.log("Going to next state");
        numLogs=-1;
        numDolphin=5;
        this.currentLevel--;
        this.checkIfSoundIsPlaying();
        this.game.state.start("game",true,false,this.currentLevel);
    },
    
    drawLevel:function(){
        var level = levelData[this.currentLevel];
        if(this.currentLevel==0){
            //First Level
            game.stage.backgroundColor =colors[randColor];
            var background = game.add.sprite(0,0,level.background.key);
            //Intro misty
            
            this.atani=game.add.sprite(level.atani.x,level.atani.y,level.atani.key);
            this.atani.alpha=0;
            this.game.add.tween(this.atani).to({alpha:1,x:0},500,Phaser.Easing.Exponential.Out,true);
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
                
            
             
             this.sirena = this.game.add.sprite(level.sirena.x,level.sirena.y,level.sirena.key)
             //this.sirena = this.game.add.sprite(level.sirena.x,level.sirena.y,"sirena");
             this.sirena.scale.setTo(0.5);
             this.sirena.anchor.setTo(0.5);
          
             this.a_s2.play();
             
              var previousButton = game.add.button(50,level.nextArrow.y,level.nextArrow.key,this.previousState,this);
             previousButton.anchor.setTo(0.5);
             previousButton.scale.setTo(0.5);
             previousButton.scale.x=-0.5;
             
            //tween sirena
             var tween=game.add.tween(this.sirena).to({y:this.sirena.y+20},2000,Phaser.Easing.Quadratic.InOut,true,0,1000,true);
             this.sirena.inputEnabled=true;
             //this.sirena.events.onInputDown.add(function(){
                 //this.sirena.frame=Math.floor(Math.random()*5);
                 //this.sirena.frame=1;
                 //check if any sound is playing
                 //this.checkIfSoundIsPlaying();
                //  var randomSound = GetRandom(this.sirenaSoundArray.length);
                //  var temp=randomSound;
                 
                //  while(randomSound==temp){
                //      this.checkIfSoundIsPlaying();
                //      randomSound=GetRandom(this.sirenaSoundArray.length);
                //      this.playMyCharacterSound(this.sirenaSoundArray[randomSound]);
                //      //temp=randomSound;
                //  }
                     
                
             //},this);
             
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
                     var tween=game.add.tween(squidSprite).to({alpha:0.5},2000,"Linear",true,0,1000,true);
                     
                 },this);
                 
             }
             
            
            //change the color of the squid when clicked
            this.squidsGroup.forEach(function(element){
                element.events.onInputDown.add(function(){
                    var frame=Math.floor((Math.random()*9)-1);
                    element.frame=frame;
                },this)
            },this);
             
            
             
        }
 
        else if(this.currentLevel==2){
            //Scene4
            this.a_s3.play();
            var background=game.add.sprite(0,0,level.background.key);
            hut=game.add.sprite(level.hut.x,level.hut.y,level.hut.key);
            //game.physics.arcade.enable(hut);
            //this.addQuake(hut);
            
            this.logs = game.add.group();
            var logSprite;
            level.trash.forEach(function(element){
                logSprite=game.add.sprite(element.x,element.y,"log");
                this.game.physics.arcade.enable(logSprite);
                logSprite.inputEnabled=true;
                logSprite.collideWorldBounds = true;
                //logSprite.input.enableDrag(true);
                //logSprite.body.setSize(25,25,25,25);
                
                this.logs.add(logSprite);
                logSprite.events.onInputDown.add(this.killLogs,this);
             
            },this);
            //add the text on the screen
            var style = {font:"18px Arial",fill:"#fff",align:"center"}
            var sceneText = game.add.text(w/2,h-50,level.sceneText,style);
            sceneText.anchor.setTo(0.5);
            
            var sceneText2 = game.add.text(w/2,50,level.sceneText2,{font:"18px Arial",fill:"#e50044",align:"center"});
            sceneText2.anchor.setTo(0.5);
            
            var nextButton = game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key,this.nextState,this);
            nextButton.anchor.setTo(0.5);
            nextButton.scale.setTo(0.5);
        
            var previousButton = game.add.button(50,level.nextArrow.y,level.nextArrow.key,this.previousState,this);
            previousButton.anchor.setTo(0.5);
            previousButton.scale.setTo(0.5);
            previousButton.scale.x=-0.5;
             
            
        }else if(this.currentLevel==3){
            var background = game.add.sprite(0,0,level.background.key);
            //var background = game.add.tileSprite(0,0,this.game.width,this.game.height,level.background.key);
            //background.autoScroll(-70,0);
            var style={font:"18px Arial",fill:"#fff",align:"center"}
            var sceneText=game.add.text(w/2,100,level.sceneText,style)
            sceneText.anchor.setTo(0.5);
            
            this.a_s4.play();
            
            var dolphinGroup = game.add.group();
            var dolphinData=levelData[this.currentLevel].dolphin;
            var dophin1=dolphinGroup.create(dolphinData[0].x,dolphinData[0].y,dolphinData[0].key);
            var dophin2=dolphinGroup.create(dolphinData[1].x,dolphinData[1].y,dolphinData[1].key);
            var dophin3=dolphinGroup.create(dolphinData[2].x,dolphinData[2].y,dolphinData[2].key);
            var dophin4=dolphinGroup.create(dolphinData[3].x,dolphinData[3].y,dolphinData[3].key);
            var dophin5=dolphinGroup.create(dolphinData[4].x,dolphinData[4].y,dolphinData[4].key);
            
            dolphinGroup.forEach(function(element){
                element.inputEnabled=true;
                element.input.pixelPerfectClick=true;
                element.events.onInputDown.add(this.killDolphin,this);
              
            },this);
            
            var nextButton = game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key,this.nextState,this);
            nextButton.anchor.setTo(0.5);
            nextButton.scale.setTo(0.5);
        
            var previousButton = game.add.button(50,level.nextArrow.y,level.nextArrow.key,this.previousState,this);
            previousButton.anchor.setTo(0.5);
            previousButton.scale.setTo(0.5);
            previousButton.scale.x=-0.5;

        }else if(this.currentLevel==4){
            var background = game.add.sprite(0,0,level.background.key);
            this.a_s5.play();
            var sirena = this.game.add.sprite(level.sirena.x-100,level.sirena.y,level.sirena.key);
            sirena.angle+=45;
            game.add.tween(sirena).to({x:700},7500,Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            
            var blueFishGroup = game.add.group();
            var fish1 = blueFishGroup.create(-70,50,"blueFish");
            var fish2 = blueFishGroup.create(600,70,"blueFish");
            var fish3 = blueFishGroup.create(-70,175,"blueFish");
            var fish4 = blueFishGroup.create(600,300,"blueFish");
            var fish5 = blueFishGroup.create(-70,400,"blueFish");
           
            
            game.add.tween(fish1).to({x:600},game.rnd.integerInRange(6000, 11000),Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            game.add.tween(fish2).to({x:-50},game.rnd.integerInRange(6000, 11000),Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            game.add.tween(fish3).to({x:600},game.rnd.integerInRange(6000, 11000),Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            game.add.tween(fish4).to({x:-50},game.rnd.integerInRange(6000, 11000),Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            game.add.tween(fish5).to({x:600},game.rnd.integerInRange(6000, 11000),Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            
            this.particleBurst(fish1)
            
            blueFishGroup.forEach(function(element){
                
                element.scale.setTo(0.5);
                element.animations.add("swim",[0,1],game.rnd.integerInRange(3, 10),true);
                element.animations.play("swim");
            },this);
            
            fish2.scale.setTo(-0.5,0.5);
            fish4.scale.setTo(-0.5,0.5);
            
            var nextButton = game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key,this.nextState,this);
            nextButton.anchor.setTo(0.5);
            nextButton.scale.setTo(0.5);
        
            var previousButton = game.add.button(50,level.nextArrow.y,level.nextArrow.key,this.previousState,this);
            previousButton.anchor.setTo(0.5);
            previousButton.scale.setTo(0.5);
            previousButton.scale.x=-0.5;
            
            background.inputEnabled = true;
            background.events.onInputDown.add(this.particleBurst,this);
           
            
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
    //     //if we want to collide emitter we need to do it in the update method
    //     //game.physics.arcade.collide(emitter);
    
    
    },
    // addQuake:function(sprite){
    //     // define the camera offset for the quake
    //   var rumbleOffset = 10;
      
    //   // we need to move according to the camera's current position
    //   var properties = {
    //     x: sprite.x - rumbleOffset
    //   };
      
    //   // we make it a relly fast movement
    //   var duration = 100;
    //   // because it will repeat
    //   var repeat = 4;
    //   // we use bounce in-out to soften it a little bit
    //   var ease = Phaser.Easing.Bounce.InOut;
    //   var autoStart = false;
    //   // a little delay because we will run it indefinitely
    //   var delay = 1000;
    //   // we want to go back to the original position
    //   var yoyo = true;
      
    //   var quake = game.add.tween(sprite)
    //     .to(properties, duration, ease, autoStart, delay, 4, yoyo);
      
    //   // we're using this line for the example to run indefinitely
    //   quake.onComplete.addOnce(this.addQuake,this);
      
    //   // let the earthquake begins
    //   quake.start();
    // },
    
    // killLogs(house,log){
    //     log.kill();
    // },
    
     killLogs(log){
        log.kill();
        numLogs++
        this.logsAudio[numLogs].play();
    },
    
    killDolphin:function(dolphine){
        var tween =game.add.tween(dolphine).to({y:dolphine.y-40,alpha:0},1000,Phaser.Easing.Quadratic.InOut,true,1);
          tween.onComplete.add(function(){
              dolphine.kill();
          },this);
        //dolphine.kill();
        numDolphin--;
        this.dolfinAudio[numDolphin].play();
        
    },
    
    
    // render:function(){
    //   if(this.currentLevel==2){
    //          this.logs.forEach(function(element){
    //                  game.debug.body(element);
    //              },this)
    //     }
        
        
       
    // }

    
   
};




var game= new Phaser.Game(450,550,Phaser.AUTO);
game.state.add("game",gameState);
game.state.start("game");