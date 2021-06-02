
  var obstacle, obstacleImage, obstacleGroup;
  var banana, bananaImage, bananaGroup;
  var monkey, monkey_running;
  var  background1,backgroundImage;
  var score= 0;
  var ground;
  var gameState="PLAY";
function preload(){
  
    backgroundImage= loadImage("jungle.jpg");
  monkey_running= loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png"); 
    bananaImage= loadImage("banana.png");
    obstacleImage= loadImage("stone.png");
}

function setup() {
  
    createCanvas(750,550);
  
  
   background1=createSprite(200,200,1000,1000);
   background1.addImage(backgroundImage)
  
    monkey= createSprite (50,340,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
    monkey.scale= 0.1;
    ground= createSprite (0,540,800,10);
    ground.visible= false;
    bananaGroup= new Group ();
    obstacleGroup= new Group ();
}

function draw() {
    background("black");
  
  
   
    if (keyDown ("space")) {
      monkey.velocityY= -20;  
    }    
 if(gameState==="PLAY"){
    if (background1.x<250) {
      background1.x= 500
    }   
    background1.velocityX=-5
    monkey.velocityY= monkey.velocityY + 0.8;
    monkey.collide (ground);
    if (bananaGroup.isTouching(monkey)) {
      score= score+2;
      bananaGroup.destroyEach();
    }
    switch (score) {
      case 10: monkey.scale= 0.15;
      break;
      case 20: monkey.scale= 0.20;
      break;
      case 30: monkey.scale= 0.25;
      break;
      case 40: monkey.scale= 0.30;
      break;
      case 50: monkey.scale= 0.35;
      break;
      default: break;
    }
    
 }
 
    if (obstacleGroup.isTouching(monkey)) {
      gameState="END"
    }
 if(gameState==="END"){
   //background(backgroundImage)
   background1.velocityX=0;
   background1.destroy();
background("black")
  textSize(20);
  fill("red")
  stroke("red")
  text("gameOver",600,300);

  monkey.velocityX=0;
  monkey.veloxityY=0;
  obstacleGroup.destroyEach();
  monkey.destroy();
  bananaGroup.destroyEach();
  
 }
   

    spawnBananas();
    spawnObstacles();
  

    drawSprites();
  
  push();
    stroke ("white");
    textSize (15);
    text ("Score: "+score,160,70);  
    pop();
}


function spawnBananas () {
  if (frameCount%150===0) {
    banana= createSprite (1200,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.06;
    banana.velocityX= -3;
    
    
      banana.lifetime= 400;
    
    
      bananaGroup.add(banana);
  }
}


function spawnObstacles () {
  if (frameCount%150===0) {
    obstacle= createSprite (1200,530,10,10);
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.scale= 0.1;
    obstacle.velocityX= -4;
    
   
      obstacleGroup.add(obstacle);
  }
}