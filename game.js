
var SirenaGame = SirenaGame || {};
SirenaGame.gameState={
     init:function(currentLevel){

      this.currentLevel=this.currentLevel || 0;
      
      
       
        
      
       // //Set the type of scaling to 'show all'
       //  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          
       //  //Set the min and max width/height of the game
       //  this.game.scale.setMinMax(this.game.width/2,this.game.height/2,this.game.width*2,this.game.height*2);
          
       //  //Center the game on the screen
       //  this.game.scale.pageAlignHorizontally = true;
       //  this.game.scale.pageAlignVertically = true;
        
       //  //Add physics
       //  this.game.physics.startSystem(Phaser.Physics.ARCADE);

        
  },
    
    
    create:function(){

      this.colors=["#facade","#beefed","#afaded","#ffc966","#ff5050"];
      this.randColor=Math.floor(Math.random()*this.colors.length);
      this.w=450;
      this.h=550;
      this.hut;
      this.numLogs=-1;
      this.numDolphin=5;


      this.levelData=[
            {
                atani:{x:-300,y:this.h/2-110,key:"atani"},
                playButton:{x:this.w-100,y:this.h/2,key:"playButton"},
                background:{key:"introBackground"}
                
            },
            {
                sirena:{x:100,y:200,key:"sirena2"},
                background:{key:"islandBackground"},
                sceneText:"Gauhu si sirena, taotao Hagatna. \nLiving on a bautifil island. \nI love to swim",
                nextArrow:{x:this.w-50,y:this.h/2,key:"arrow"},
                squid:[{x:150,y:this.h/2,key:"squid",frame:0},{x:this.w-75,y:this.h-100,key:"squid",frame:1},{x:this.w-150,y:this.h/2+75,key:"squid",frame:2}]
            },
           
            {
                background:{key:"outdoor"},
                hut:{x:100,y:this.h/2-50,key:"hut"},
                trash:[{x:40,y:this.h/2+20,key:"log"},{x:130,y:this.h/2+20},{x:160,y:350},{x:300,y:250}],
                sceneText:"Whenever I get a chance\nI would sneak away,\noften times i forget about my chores\nto go swimming",
                sceneText2:"Help with Sirena's chores\n and put the logs in the hut",
                nextArrow:{x:this.w-50,y:this.h/2,key:"arrow"}
            },
            {
                background:{key:"waterBackground"},
                sceneText:"Being a young teen, I was really rebellous.\nI would rather swim than do anything else.\nOne day while doing chores,\nI had snuck away to go swimming",
                dolphin:[{x:75,y:200,key:"dolphin1"},{x:200,y:250,key:"dolphin2"},{x:300,y:300,key:"dolphin3"}/*gray*/,{x:20,y:400,key:"dolphin4"},{x:50,y:300,key:"dolphin5"}],
                nextArrow:{x:this.w-50,y:this.h/2,key:"arrow"}
                
            },
            {
                background:{key:"waterBackground"},
                sirena:{x:-10,y:150,key:"sirena2"},
                nextArrow:{x:this.w-50,y:this.h/2,key:"arrow"}
            },
            
            {
                 nextArrow:{x:this.w-50,y:this.h/2,key:"arrow"}
            }
        
        
        
        ];
       
        //audio
        this.a_intro= this.game.add.audio("s1");
        this.a_s2 =this.game.add.audio("s2");
        this.a_s3=this.game.add.audio("s3");
        this.a_s4=this.game.add.audio("s4");
        this.a_s5=this.game.add.audio("s5");
        this.a_pop=this.game.add.audio("pop");
       
        
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
        
        
        this.soundsArray=[this.a_intro,this.a_s2,this.a_s3,this.a_s4,this.a_s5,this.a_5,this.a_4,this.a_3,this.a_2,this.a_1,this.a_pop,this.awesome,this.good_job,this.almost_done,this.yeah_you_did_it];
        //this.sirenaSoundArray=[this.a_imSirena,this.a_sirena2,this.a_sirena3];
        
        //bubble emitter
        this.bubbleEmitter = this.game.add.emitter(0,0,50);
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
       if(this.currentLevel==0){
           this.isIntroSoundPlaying(this.a_intro,this.playButton,this.nextState);
       }
       else if(this.currentLevel==1){
           this.isIntroSoundPlaying(this.a_s2,this.previousButton,this.previousState);
           this.isIntroSoundPlaying(this.a_s2,this.nextButton,this.nextState);
       }else if(this.currentLevel==2){
           this.isIntroSoundPlaying(this.a_s3,this.previousButton,this.previousState);
           this.isIntroSoundPlaying(this.a_s3,this.nextButton,this.nextState);
       }else if(this.currentLevel==3){
           this.isIntroSoundPlaying(this.a_s4,this.previousButton,this.previousState);
           this.isIntroSoundPlaying(this.a_s4,this.nextButton,this.nextState);
       }else if(this.currentLevel==4){
           this.isIntroSoundPlaying(this.a_s5,this.previousButton,this.previousState);
           this.isIntroSoundPlaying(this.a_s5,this.nextButton,this.nextState);
       }
    //   else if(this.currentLevel==5){
    //       this.isIntroSoundPlaying(this.a_s6,this.previousButton,this.previousState);
    //       this.isIntroSoundPlaying(this.a_s6,this.nextButton,this.nextState);
    //   }
   
    },
    
    nextState:function(){
        
        console.log("Going to next state");
        this.numLogs=-1;
        this.numDolphin=5;
        this.currentLevel++;
        this.checkIfSoundIsPlaying();
        this.game.state.start("game",true,false,this.currentLevel);
        
        
    },
    previousState:function(){
          console.log("Going to next state");
        this.numLogs=-1;
        this.numDolphin=5;
        this.currentLevel--;
        this.checkIfSoundIsPlaying();
        this.game.state.start("game",true,false,this.currentLevel);
    },
    
    drawLevel:function(){
        var level = this.levelData[this.currentLevel];
        if(this.currentLevel==0){
            //First Level
            this.game.stage.backgroundColor =this.colors[this.randColor];
            var background = this.game.add.sprite(0,0,level.background.key);
            //Intro misty
            
            this.atani=this.game.add.sprite(level.atani.x,level.atani.y,level.atani.key);
            this.atani.alpha=0;
            this.game.add.tween(this.atani).to({alpha:1,x:0},500,Phaser.Easing.Exponential.Out,true);
            this.a_intro.play();
            
            
            
            //Play button
            // this.playButton = this.game.add.button(level.playButton.x,level.playButton.y,level.playButton.key,this.nextState,this);
            this.playButton=this.game.add.sprite(level.playButton.x,level.playButton.y,level.playButton.key);
            this.playButton.anchor.setTo(0.5);
            var tween=this.game.add.tween(this.playButton.scale).to({x:1.3,y:1.3},1000,"Linear",true);
            tween.yoyo(1000).loop();
            
            
            
          
        }
        else if(this.currentLevel==1){
             //level2
             
             
             var background=this.game.add.sprite(0,0,level.background.key);
            //  var nextButton = this.game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key,this.nextState,this);
            //  nextButton.anchor.setTo(0.5);
            //  nextButton.scale.setTo(0.5);
                
            
             
             this.sirena = this.game.add.sprite(level.sirena.x,level.sirena.y,level.sirena.key)
             //this.sirena = this.game.add.sprite(level.sirena.x,level.sirena.y,"sirena");
             this.sirena.scale.setTo(0.5);
             this.sirena.anchor.setTo(0.5);
          
             this.a_s2.play();
             
            //   var previousButton = this.game.add.button(50,level.nextArrow.y,level.nextArrow.key,this.previousState,this);
            //  previousButton.anchor.setTo(0.5);
            //  previousButton.scale.setTo(0.5);
            //  previousButton.scale.x=-0.5;
             
            //tween sirena
             var tween=this.game.add.tween(this.sirena).to({y:this.sirena.y+20},2000,Phaser.Easing.Quadratic.InOut,true,0,1000,true);
             this.sirena.inputEnabled=true;
             
             
             //loop through the data for all the squid
             this.squidsGroup=this.game.add.group();
             var squidSprite;
             var squidData = this.levelData[this.currentLevel].squid;
             if(squidData){
                 squidData.forEach(function(element){
                     squidSprite = this.game.add.sprite(element.x,element.y,element.key,element.frame);
                     squidSprite.inputEnabled=true;
                    
                     this.squidsGroup.add(squidSprite);
                     var tween=this.game.add.tween(squidSprite).to({alpha:0.5},2000,"Linear",true,0,1000,true);
                     
                 },this);
                 
             }
             
            
            //change the color of the squid when clicked
            this.squidsGroup.forEach(function(element){
                element.events.onInputDown.add(function(){
                    var frame=Math.floor((Math.random()*9)-1);
                    element.frame=frame;
                },this)
            },this);
             
             
         //buttons
            this.previousButton = this.game.add.button(50,level.nextArrow.y,level.nextArrow.key);
            this.previousButton.anchor.setTo(0.5);
            this.previousButton.scale.setTo(0.5);
            this.previousButton.scale.x=-0.5;
            
            this.nextButton = this.game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key);
            this.nextButton.anchor.setTo(0.5);
            this.nextButton.scale.setTo(0.5);
            
             
        }
 
        else if(this.currentLevel==2){
            //Scene4
            this.a_s3.play();
            var background=this.game.add.sprite(0,0,level.background.key);
            hut=this.game.add.sprite(level.hut.x,level.hut.y,level.hut.key);
            //game.physics.arcade.enable(hut);
            //this.addQuake(hut);
            
            this.logs = this.game.add.group();
            var logSprite;
            
            
            
            
            level.trash.forEach(function(element){
                logSprite=this.game.add.sprite(element.x,element.y,"log");
                this.game.physics.arcade.enable(logSprite);
                // logSprite.inputEnabled=true;
                // logSprite.collideWorldBounds = true;
                //logSprite.input.enableDrag(true);
                //logSprite.body.setSize(25,25,25,25);
                
                this.logs.add(logSprite);
                
                //logSprite.events.onInputDown.add(this.killLogs,this);
             
            },this);
            
            
            this.game.time.events.add(Phaser.Timer.SECOND * 8, function(){
            this.logs.forEach(function(element){
                element.inputEnabled=true;
                element.collideWorldBounds = true;
                element.events.onInputDown.add(this.killLogs,this);
                
            },this);
            },this);
            
            //add the text on the screen
            //var style = {font:"18px Arial",fill:"#fff",align:"center"}
            //var sceneText = game.add.text(w/2,h-50,level.sceneText,style);
            //sceneText.anchor.setTo(0.5);
            
            //var sceneText2 = game.add.text(w/2,50,level.sceneText2,{font:"18px Arial",fill:"#e50044",align:"center"});
            //sceneText2.anchor.setTo(0.5);
            
            // var nextButton = this.game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key,this.nextState,this);
            // nextButton.anchor.setTo(0.5);
            // nextButton.scale.setTo(0.5);
        
            // var previousButton = this.game.add.button(50,level.nextArrow.y,level.nextArrow.key,this.previousState,this);
            // previousButton.anchor.setTo(0.5);
            // previousButton.scale.setTo(0.5);
            // previousButton.scale.x=-0.5;
            
             //buttons
            this.previousButton = this.game.add.button(50,level.nextArrow.y,level.nextArrow.key);
            this.previousButton.anchor.setTo(0.5);
            this.previousButton.scale.setTo(0.5);
            this.previousButton.scale.x=-0.5;
            
            this.nextButton = this.game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key);
            this.nextButton.anchor.setTo(0.5);
            this.nextButton.scale.setTo(0.5);
             
            
        }else if(this.currentLevel==3){
            var background = this.game.add.sprite(0,0,level.background.key);
            //var background = game.add.tileSprite(0,0,this.game.width,this.game.height,level.background.key);
            //background.autoScroll(-70,0);
            var style={font:"18px Arial",fill:"#fff",align:"center"}
            var sceneText=this.game.add.text(this.w/2,100,level.sceneText,style)
            sceneText.anchor.setTo(0.5);
            
            this.a_s4.play();
            
            var dolphinGroup = this.game.add.group();
            var dolphinData=this.levelData[this.currentLevel].dolphin;
            var dophin1=dolphinGroup.create(dolphinData[0].x,dolphinData[0].y,dolphinData[0].key);
            var dophin2=dolphinGroup.create(dolphinData[1].x,dolphinData[1].y,dolphinData[1].key);
            var dophin3=dolphinGroup.create(dolphinData[2].x,dolphinData[2].y,dolphinData[2].key);
            var dophin4=dolphinGroup.create(dolphinData[3].x,dolphinData[3].y,dolphinData[3].key);
            var dophin5=dolphinGroup.create(dolphinData[4].x,dolphinData[4].y,dolphinData[4].key);
            
            this.game.time.events.add(Phaser.Timer.SECOND * 9, function(){
                dolphinGroup.forEach(function(element){
                element.inputEnabled=true;
                element.input.pixelPerfectClick=true;
                element.events.onInputDown.add(this.killDolphin,this);
              
            },this);
            }, this);
            
          
            
             
            
            // var nextButton = this.game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key,this.nextState,this);
            // nextButton.anchor.setTo(0.5);
            // nextButton.scale.setTo(0.5);
        
            // var previousButton = this.game.add.button(50,level.nextArrow.y,level.nextArrow.key,this.previousState,this);
            // previousButton.anchor.setTo(0.5);
            // previousButton.scale.setTo(0.5);
            // previousButton.scale.x=-0.5;
            
            
             //buttons
            this.previousButton = this.game.add.button(50,level.nextArrow.y,level.nextArrow.key);
            this.previousButton.anchor.setTo(0.5);
            this.previousButton.scale.setTo(0.5);
            this.previousButton.scale.x=-0.5;
            
            this.nextButton = this.game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key);
            this.nextButton.anchor.setTo(0.5);
            this.nextButton.scale.setTo(0.5);

        }else if(this.currentLevel==4){
            var background = this.game.add.sprite(0,0,level.background.key);
            this.a_s5.play();
            //var sirena = this.game.add.sprite(level.sirena.x-100,level.sirena.y,level.sirena.key);
            var sirena = new SirenaGame.Sirena(this.game,level.sirena.x-100,level.sirena.y,level.sirena.key)
           
            sirena.angle+=45;
            this.game.add.tween(sirena).to({x:700},7500,Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            
            var blueFishGroup = this.game.add.group();
            var fish1 = blueFishGroup.create(-70,50,"blueFish");
            var fish2 = blueFishGroup.create(600,70,"blueFish");
            var fish3 = blueFishGroup.create(-70,175,"blueFish");
            var fish4 = blueFishGroup.create(600,300,"blueFish");
            var fish5 = blueFishGroup.create(-70,400,"blueFish");
           
            
            this.game.add.tween(fish1).to({x:600},this.game.rnd.integerInRange(6000, 11000),Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            this.game.add.tween(fish2).to({x:-50},this.game.rnd.integerInRange(6000, 11000),Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            this.game.add.tween(fish3).to({x:600},this.game.rnd.integerInRange(6000, 11000),Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            this.game.add.tween(fish4).to({x:-50},this.game.rnd.integerInRange(6000, 11000),Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            this.game.add.tween(fish5).to({x:600},this.game.rnd.integerInRange(6000, 11000),Phaser.Easing.Quadratic.InOut,true,0,1000,false);
            
            this.particleBurst(fish1)
            
            blueFishGroup.forEach(function(element){
                
                element.scale.setTo(0.5);
                element.animations.add("swim",[0,1],this.game.rnd.integerInRange(3, 10),true);
                element.animations.play("swim");
            },this);
            
            fish2.scale.setTo(-0.5,0.5);
            fish4.scale.setTo(-0.5,0.5);
            
            // var nextButton = this.game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key,this.nextState,this);
            // nextButton.anchor.setTo(0.5);
            // nextButton.scale.setTo(0.5);
        
            // var previousButton = this.game.add.button(50,level.nextArrow.y,level.nextArrow.key,this.previousState,this);
            // previousButton.anchor.setTo(0.5);
            // previousButton.scale.setTo(0.5);
            // previousButton.scale.x=-0.5;
            
            background.inputEnabled = true;
            background.events.onInputDown.add(this.particleBurst,this);
            
            
            
            
             //buttons
            this.previousButton = this.game.add.button(50,level.nextArrow.y,level.nextArrow.key);
            this.previousButton.anchor.setTo(0.5);
            this.previousButton.scale.setTo(0.5);
            this.previousButton.scale.x=-0.5;
            
            this.nextButton = this.game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key);
            this.nextButton.anchor.setTo(0.5);
            this.nextButton.scale.setTo(0.5);
           
            
        }else if(this.currentLevel==5){
            var background= this.game.add.tileSprite(0,0,this.game.width,this.game.height,"background2");
            background.autoScroll(-70,0);
            this.moon = this.game.add.sprite(10,100,"sun");
            this.moon2 = this.game.add.sprite(this.game.width-this.moon.width-10,10+200,"moon");
            this.moon2.alpha=0;
            
            this.mom=this.game.add.sprite(0,300,"mom");
            this.mom.scale.setTo(-0.5,0.5);
            
            //a timer to tween the mom
            this.game.time.events.add(Phaser.Timer.SECOND * 8,function(){
                
                var momTween = this.game.add.tween(this.mom).to({x:200},2000,Phaser.Easing.Exponential.InOut,true);
                //stop background scroll
                background.stopScroll();
                
                momTween.onComplete.add(function(){
                     this.mom.inputEnabled=true;
                     this.mom.events.onInputDown.addOnce(function(){
                         momTween.to({x:0},2000,Phaser.Easing.Default,true);
                         background.autoScroll(-70,0);
                     this.starCreator=this.game.time.events.loop(Phaser.Timer.SECOND*this.game.rnd.integerInRange(1,2),this.newStar,this);
                     },this);
                    
                },this);
               
            }, this);

              
              
            this.moonTween=this.game.add.tween(this.moon).to({y:this.moon.y+200,alpha:0},5000, Phaser.Easing.Default);
              
            this.moonTween.start();
              
            this.tweenTint(background,0x96CCBB,0x2f403b, 5000);
              
            this.moonTween.onComplete.add(function(){
                  
                this.moon2Tween=this.game.add.tween(this.moon2).to({alpha:1,y:this.moon2.y-210},5000,Phaser.Easing.Default).start();
                this.tweenTint(background,0x82AD9D,0x202b28,5000);
                  
                //This is to make it repeat
                // this.moon2Tween.onComplete.add(function(){
                      
                //     this.moon.x=10;
                //     this.moon.y=10;
                //     this.moon.alpha=1;
                //     this.moonTween.start()
                //     this.tweenTint(background,0x96CCBB,0x2f403b, 5000);
                      
                //     this.moon2.x=this.game.width-this.moon.width-10;
                //     this.moon2.y=210;
                //     this.moon2.alpha=0;
                      
                // },this)
                  
            },this);
      
            this.stars=this.game.add.group();
            this.stars.enableBody=true;
            this.stars.createMultiple(20,"star");
            //this.newStar();
         
            
            
             //buttons
            this.previousButton = this.game.add.button(50,level.nextArrow.y,level.nextArrow.key);
            this.previousButton.anchor.setTo(0.5);
            this.previousButton.scale.setTo(0.5);
            this.previousButton.scale.x=-0.5;
            
            this.nextButton = this.game.add.button(level.nextArrow.x,level.nextArrow.y,level.nextArrow.key);
            this.nextButton.anchor.setTo(0.5);
            this.nextButton.scale.setTo(0.5);

      
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
        var x = this.game.input.x;
        var y = this.game.input.y;
    
        var emitter = this.game.add.emitter(x,y,100);
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
        this.numLogs++
        this.logsAudio[this.numLogs].play();
    },
    
    killDolphin:function(dolphine){
        dolphine.inputEnabled=false;
        var tween =this.game.add.tween(dolphine).to({y:dolphine.y-40,alpha:0},1000,Phaser.Easing.Quadratic.InOut,true,1);
          tween.onComplete.add(function(){
              dolphine.kill();
          },this);
        //dolphine.kill();
        this.numDolphin--;
        this.dolfinAudio[this.numDolphin].play();
        
    },
    
     tweenTint:function(obj, startColor, endColor, time) {    
      // create an object to tween with our step value at 0    
      var colorBlend = {step: 0};    
      // create the tween on this object and tween its step property to 100    
      var colorTween = this.game.add.tween(colorBlend).to({step: 100}, time);        
      // run the interpolateColor function every time the tween updates, feeding it the    
      // updated value of our tween each time, and set the result as our tint    
      colorTween.onUpdateCallback(function() {      
          obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);       
          
      });        
      // set the object to the start color straight away    
      obj.tint = startColor;            
      // start the tween    
      colorTween.start();
         
     },
     newStar:function(){
         var star=this.stars.getFirstDead();
         
         if(!star){
             return;
         }
         
         star.anchor.setTo(0.5);
         star.reset(this.game.rnd.integerInRange(star.width,this.game.width-80),0);
         star.body.velocity.y=this.game.rnd.integerInRange(150,250);
         star.alpha=0.8;
         star.scale.setTo(0.5);
         var randomColor=Math.floor(Math.random()*5)
         var starColors=[0xfbdd3f,0xf7f574,0xf966c1,0xfffafa,0x00ffff];
         star.tint=starColors[randomColor];
         
         //kill the star when it leaves the world
         star.checkWorldBounds = true;
         star.outOfBoundsKill=true;
         
         star.inputEnabled=true;
         star.events.onInputDown.add(function(){
             var starTween=this.game.add.tween(star).to({alpha:0},300,"Linear",true);
             starTween.onComplete.add(function(){
                  star.kill();
             },this)
            
             
         },this)
     },
     isIntroSoundPlaying:function(sound,sprite,event){
      if(!sound.isPlaying){
        sprite.inputEnabled=true;
        sprite.events.onInputDown.add(event,this);
      }else{
        sprite.inputEnabled=false;
      }
    },
    
    // render:function(){
    //   if(this.currentLevel==2){
    //          this.logs.forEach(function(element){
    //                  game.debug.body(element);
    //              },this)
    //     }
        
        
       
    // }

    
   
};




// var game= new Phaser.Game(450,550,Phaser.AUTO);
// game.state.add("game",SirenaGame.gameState);
// game.state.start("game");