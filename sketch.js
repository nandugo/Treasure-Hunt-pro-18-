var path,boy,cash,diamonds,jwellery,sword,gameover//goodjob;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg//goodjobImage;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;


//gamestates
var PLAY=1;
var END=0;
var gameState=1;

let songcatch;
let songover;
let songrun;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  //goodjobImage=loadImage("Good-Job.png");
  songcatch=loadSound('catch.mp3');
  songover=loadSound('gameover.mp3');
  songrun=loadSound('running.mp3');
}

function setup(){
  
  
  createCanvas(wndowwidth,wndowHeight);
// Moving background
path=createSprite(width/2,300);
path.addImage(pathImg);
path.velocityY = 4;

  //goodjob=createSprite(200,200);  
  //goodjob.addImage(goodjobImage);
  //goodjob.visible=false;
  //goodjob.scale=0.5;

//creating boy running
boy = createSprite(width/2,height-20,20,20)
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.debug=false;
boy.setCollider("circle",0,0,20)
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

  songrun.play();
}

function draw() {

  background(0);
  

   if(gameState===PLAY){
  boy.x = World.mouseX;

  edges= createEdgeSprites();
  boy.collide(edges);
    
    
    if(path.y > height){
    path.y = height/2;
  }
    
  createCash();
  createDiamonds();
  createJwellery();
  createSword();
    

    
  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    treasureCollection=treasureCollection+100;
    console.log(cash);
    songcatch.play();
   }
    else if (diamondsG.isTouching(boy)) {
        diamondsG.destroyEach();
        treasureCollection=treasureCollection+200;
       // console.log(diamond);
      songcatch.play();
      
   }else if(jwelleryG.isTouching(boy)) {
       jwelleryG.destroyEach();
       treasureCollection=treasureCollection+50;
     console.log(jwellery);
     songcatch.play();
     
      
    }else if(swordGroup.isTouching(boy)) {
      songrun.stop();
        swordGroup.destroyEach();
       gameState=END ;
      boy.addAnimation("SahilRunning",endImg);
      boy.scale=1;
      boy.x=300;
      boy.y=300;
      songover.play();
    }

  //if(treasureCollection=1000){
   // boy.y=900;
   // boy.x=900;
   // goodjob.visible=true;
   // gameState=END;
    //console.log(1000);
   //} 

    
  }else if(gameState===END){
      path.velocityY=0;
      boy.velocityY=0;
      cashG.setLifetimeEach(-1)
      swordGroup.setLifetimeEach(-1)
      jwelleryG.setLifetimeEach(-1)
      diamondsG.setLifetimeEach(-1)
      cashG.setVelocityEach(0)
      swordGroup.setVelocityEach(0)
      jwelleryG.setVelocityEach(0)
      diamondsG.setVelocityEach(0)
    }

  
  textSize(30);
  fill(255);
  drawSprites();
  text("Treasure: "+ treasureCollection,400,30);
  
}

function createCash() {
  if (World.frameCount % 300 == 0) {
  var cash = createSprite(Math.round(random(50,width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 600;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 200 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 600;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 100 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 600;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 300 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 600;
  swordGroup.add(sword);
  }
}