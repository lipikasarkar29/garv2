var START=0;
var PLAY=1;
var END=2;

var score=0;
var life=3;


var gameState = START;

var restart;

function preload(){
  

  back1Img = loadImage("back1.jpg");
  backimg = loadImage("back.jpg");
  playImg = loadImage("play.png")
  back2Img = loadImage("bg2.jpg");
  playerimg = loadImage("First Person Img.png");
  restartImg = loadImage("restart.png");
  fireBallIMG=loadImage("fireBall.png")
  helicop1Img=loadImage("helicop1.png")
  helicop2Img=loadImage("helicop2.png")
  helicop3Img=loadImage("helicop3.png")
  
  themeSound=loadSound("theme.mp3")
  shootingSound=loadSound("shooting.mp3")
  winSound=loadSound("win.mp3")
  dieSound=loadSound("die.mp3")
}



function setup() {
  createCanvas(windowWidth , windowHeight);
  back1 = createSprite(windowWidth/2,windowHeight/2);
  back1.addImage(back1Img)
  
  playBtn = createSprite(windowWidth/2-530, windowHeight/2+120)
 playBtn.addImage(playImg)
 playBtn.scale = 0.8

  back2 = createSprite(windowWidth/2, windowHeight/2);
  back2.addImage( "b1",back2Img);
  back2.visible=false
  
  player=createSprite(width/2, height-50,30,30)
  player.addImage(playerimg)
  player.scale=0.5;
  player.visible=false
  
  restart=createSprite(windowWidth/2, windowHeight/2)
  restart.addImage(restartImg)
  restart.scale= 0.7;  
  restart.visible=false
  
  heli1group=createGroup();
  heli2group=createGroup();
  heli3group=createGroup();
  
  
  fireBallGroup=createGroup();
  
  themeSound.loop()
}



function draw() {
  background(0);
  drawSprites();
  fill("yellow");
  textSize(20)
  text("Score: "+score,width-200,80);
  text("Lives: "+life,width-200,100);
   
  if(gameState===START){
    restart.visible=false
     if(mousePressedOver(playBtn)){
       gameState = PLAY
     }
   }
  if(gameState===PLAY){
    //restart.visible=false
    
    back1.visible=false;
    playBtn.visible=false;
    back2.visible= true;
    back2.velocityY=5;
    player.visible=true;
    
    
    
    if(back2.y>windowHeight){
      back2.y=windowHeight/2
    }
    
    player.x=mouseX;
    
    
    var select1= Math.round(random(1,3))
    if(frameCount%160===0){
      if(select1===1){
        spawnHeli1();
      }
        if(select1===2){
        spawnHeli2();
      }
      if(select1===3){
        spawnHeli3();
      }
    }
    
    
    
  
    if(keyWentDown("space")){
    createfireballs();
    shootingSound.play();
  }
    
    //destroying heli1 by fireball
        for(var fb = 0; fb < fireBallGroup.length; fb++){
          for(var heli1=0;heli1<heli1group.length;heli1++){
            if(fireBallGroup.isTouching(heli1group)){
              heli1group.get(heli1).remove();
              fireBallGroup.get(fb).lifetime=0;
              score = score + 50;
            }
          }
        }
    
   //destroying heli2 by fireball
        for(var fb1 = 0; fb1 < fireBallGroup.length; fb1++){
          for(var heli2=0;heli2<heli2group.length;heli2++){
            if(fireBallGroup.isTouching(heli2group)){
              heli2group.get(heli2).remove();
              fireBallGroup.get(fb1).lifetime=0;
              score = score + 50;
            }
          }
        }
    
    //destroying heli3 by fireball
        for(var fb2 = 0; fb2 < fireBallGroup.length; fb2++){
          for(var heli3=0;heli3<heli3group.length;heli3++){
            if(fireBallGroup.isTouching(heli3group)){
              heli3group.get(heli3).remove();
              fireBallGroup.get(fb2).lifetime=0;
              score = score + 50;
            }
          }
        }
    
    
    
    if(heli1group.isTouching(player)||heli2group.isTouching(player)||heli3group.isTouching(player)){
      life=life-1;
      dieSound.play();
      gameState=END;
    }
    
  }
  
  else if(gameState===END) {
    
    back2.velocityY=0
    heli1group.destroyEach();
    heli2group.destroyEach();
    heli3group.destroyEach();
   
    
    player.destroy();
    
    
    if (life>=1) {
      restart=createSprite(windowWidth/2, windowHeight/2)
      restart.addImage(restartImg)
      restart.scale= 0.7;  
      restart.visible=true;
      //restart.visible=true;
          textSize(20)
          fill("cyan")
          text("TRY AGAIN...",windowWidth/2-50,windowHeight/2+100)
          if (mousePressedOver(restart)){
          
          reset();
        }
    }
      else{
      restart.visible=false;
      textSize(30)
      fill("red")
      stroke("yellow")
      strokeWeight(3);
      text("Sorry!!! You LOSE",windowWidth/2-50,windowHeight/2)
    }
      
    }
    
    
    
   
    
    
  
  
  if(score===1500 && gameState===PLAY){
      winSound.play();
      gameState=START
      score=0;
      life=3;
    }
  
  
}

function reset(){
  //restart.visible = true;
  
  gameState=PLAY
  
  
  back2 = createSprite(windowWidth/2, windowHeight/2);
  back2.addImage( "b1",back2Img);
  
  player=createSprite(width/2, height-50,30,30)
  player.addImage(playerimg)
  player.scale=0.5;
  player.x=mouseX
  
 //preload();
  
}

function spawnHeli1(){
    var helicop1 = createSprite(random(windowWidth/2-600,windowWidth/2+600),20,50 , 50 )
    helicop1.addImage(helicop1Img);
    //helicop1.scale=0.1;
    helicop1.velocityY=8+score/200;
    helicop1.lifetime=800;
    heli1group.add(helicop1)
  }  
  
  


  function spawnHeli2(){
    var helicop2 = createSprite(random(windowWidth/2-600,windowWidth/2+600),20,50 , 50 )
    helicop2.addImage(helicop2Img);
    //helicop2.scale=0.1;
    helicop2.velocityY=8+score/200;
    helicop2.lifetime=800;
    heli2group.add(helicop2)
  }    
  
  function spawnHeli3(){
    var helicop3 = createSprite(random(windowWidth/2-600,windowWidth/2+600),20,50 , 50 )
    helicop3.addImage(helicop3Img);
    //helicop3.scale=0.1;
    helicop3.velocityY=8+score/200;
    helicop3.lifetime=800;
    heli3group.add(helicop3)
  }  
  
  
function createfireballs(){
          var fireBall= createSprite(200,500,20, 20);
          fireBall.addImage(fireBallIMG);
          fireBall.x=player.x;
          fireBall.velocityY = -8 ;
          fireBall.lifetime = 800;
          fireBall.scale = 0.1;
          fireBallGroup.add(fireBall);
          //ShootSound.play()
}
    



