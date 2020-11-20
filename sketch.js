var monkey,monkey_running;
var banana,bananaImage,obstacle,obstacleImage;
var FoodGroup,obstacleGroup;
var survivalTime;
var forestImage;
var ground;
var score;

function preload(){
  
monkey_running =                  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
forestImage =loadImage("forest.jpg");
}

function setup() {

  createCanvas(600,500);
  
  background =createSprite(0,0,600,600);
  background.addImage("forest",forestImage);
  background.scale =5;
  
  monkey =createSprite(80,381,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale =0.2;
  
  ground =createSprite(400,447,900,10);
  ground.x =ground.width/2;
  ground.velocityX =-3;
  ground.visible =true;
  
  FoodGroup =new Group();
  obstacleGroup =new Group();

  survivalTime =0;
  
   
  }


function draw() {
  
  background.velocityX =-3;
  
  if(background.x<0){
  background.x =background.width/2;
  }
  
  if(ground.x<0){
  ground.x =ground.width/2;
  }
  
  if(keyDown("space")&&monkey.y>=170){
  monkey.velocityY =-15;
  }
  
  console.log(ground.x);
  monkey.velocityY =monkey.velocityY+0.8;
  monkey.collide(ground);
  spawnObstacles();
  spawnBanana();
  
 if(monkey.isTouching(obstacleGroup)){
    monkey.velocityY =0;
    survivalTime =0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    background.velocityX =0;
    FoodGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
  }
  drawSprites();
  
  survivalTime =survivalTime+Math.round(getFrameRate()/60);
  fill("white")
  textSize(30);
  text("Survival Time:"+survivalTime,210,40);
  
  }

function spawnObstacles(){

  if(frameCount%300===0){
  var obstacle =createSprite(600,401,20,20);
  obstacle.velocityX =-10;
  obstacle.addImage("block",obstacleImage);
  obstacle.scale =0.2;
  obstacle.lifetime =100;
  obstacleGroup.add(obstacle);
  }
  
  }

function spawnBanana(){
  
  if(frameCount%80===0){
  var banana =createSprite(600,161,20,20);
  banana.y=Math.round(random(120,200));
  banana.velocityX =-5;
  banana.addImage("block",bananaImage);
  banana.scale =0.15;
  banana.lifetime =120;
  FoodGroup.add(banana);
  }
  }
