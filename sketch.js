
  var obstacle, obstacleImage, obstacleGroup;
  var banana, bananaImage, bananaGroup;
  var monkey, monkey_running;
  var  backgroundy;
  var score= 0;
  var ground;
  var gameState="PLAY";
function preload(){
  
    backgroundy= loadImage("jungle.jpg");
  monkey_running= loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png"); 
    bananaImage= loadImage("banana.png");
    obstacleImage= loadImage("stone.png");
}

function setup() {
  
    createCanvas(1200,600);
  
  
   
  
    monkey= createSprite (50,340,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
    monkey.scale= 0.1;
    ground= createSprite (0,600,800,10);
   // ground.visible= false;
    bananaGroup= new Group ();
    obstacleGroup= new Group ();
}

function draw() {
    background(backgroundy);
  
  
   
    if (keyDown ("space")) {
      monkey.velocityY= -20;  
    }    
 if(gameState==="PLAY"){
    if (backgroundy.x<1200) {
      backgroundy.x= 200
    }   
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
   push()
  textSize(20);
  fill("red")
  stroke("red")
  text("gameOver",600,300);
  pop()
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
    obstacle= createSprite (1200,600,10,10);
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.scale= 0.1;
    obstacle.velocityX= -4;
    
   
      obstacleGroup.add(obstacle);
  }
}