var PLAY=1;
var END=0;
var gameState=PLAY;
var survivalTime=0;
var monkey , monkey_running,monkeycollided
var banana ,bananaImage, obstacle, obstacleImage,ground,groundImage,invisibleGround
var bananaGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
 
}



function setup() {
 createCanvas(600,450) 
 monkey=createSprite(80,315,20,20);
 monkey.addAnimation("moving",monkey_running);
 monkey.scale=0.1
  
 ground=createSprite(400,350,900,10);
 ground.x=ground.width/2;
 console.log(ground.x)
  
  invisibleGround=createSprite(400,350,900,10);
  invisibleGround.velocityX=-4;
  invisibleGround.x=ground.width/2;
  
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
background("white")
  
 
  
 
  
 if(gameState===PLAY){
   foods();
   ground.velocityX=0
    if(invisibleGround.x<100){
    invisibleGround.x=invisibleGround.width/2;
       if (ground.x <100){
      ground.x = ground.width/2;
    }
  }
    
  if(keyDown("space") && monkey.y>=315 && monkey.collide(ground)){
    monkey.velocityY=-17
   }
    monkey.velocityY=monkey.velocityY+0.8
    spawnObstacles();
   
     stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survival Time: "+survivalTime,100,50);
  
 }
 
  
  if(obstacleGroup.collide(monkey)){
    
    gameState=END
  }
  
  if(gameState===END){
    obstacleGroup.setvelocityXEach=0;
    bananaGroup.setvelocityXEach=0;
    invisibleGround.setvelocityX=0
   obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1)
  }
  
 
  monkey.collide(ground)
  monkey.collide(obstacleGroup);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:  "+score,500,50)
  

  
 
  drawSprites();
}

function foods(){
  if(frameCount%110===0){
    var food=createSprite(600,Math.round(random(120,200)))
    food.addImage(bananaImage)
    food.scale=0.1
    food.velocityX=-8
     food.lifetime=300
    bananaGroup.add(food);
  }
 }

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,330,900,10);
   obstacle.velocityX = -8
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle)
 }
}


