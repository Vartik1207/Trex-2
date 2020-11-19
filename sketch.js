var trex ;
var treximage ;
var edges;
var ground ;
var groundimages ;
var invisibleground ;
var clouds,cloud_image ;
var  obstacle ;
var  obstacle1 ;
var  obstacle2 ;
var  obstacle3 ;
var  obstacle4 ;
var  obstacle5 ; 
var  obstacle6 ;
var  score=0;
var gamestate="play";
var cloudgroup ; 
var obstaclegroup;
var trexcolide;
var restart;
var restartImage;
var gameover;
var gameoverImage;
var diesound;
var jumpsound;
var checkpointsound;






function preload (){
treximage=loadAnimation("trex1.png","trex3.png","trex4.png");
groundimages= loadImage("ground2.png");
  cloud_image=loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  trexcolide = loadAnimation ("trex_collided.png")
  restartImage = loadImage("restart.png");
  gameoverImage = loadImage("gameOver.png");
  diesound = loadSound("die.mp3")
  jumpsound = loadSound("jump.mp3")
  checkpointsound=loadSound("checkPoint.mp3")
  
  
}




function setup (){
createCanvas(600,400) ;
   trex=createSprite(50,380,20,20 );
  trex.addAnimation("trexrunning",treximage);   
  trex.scale=0.5;
  
  restart=createSprite(300,200);
  restart.addImage(restartImage);
  
  gameover=createSprite(300,100);
  gameover.addImage(gameoverImage);
  
  
  
  ground=createSprite(300,380,600,20);
  ground.addImage("ground",groundimages);
  
  
  invisibleground=createSprite(300,395,600,20)
  invisibleground.visible=false
  
  var Rn = random(1,100) 
  //console.log(Rn)
   
  cloudgroup= new Group ()
  obstaclegroup = new Group ()
  
  trex.debug=false
  trex.setCollider("rectangle",0,0,90,90)
 
   trex.addAnimation ("trexcollided",trexcolide);

}

function draw () {
  // console.time();
  background("red");
  drawSprites();
  edges=createEdgeSprites();
  
   
  //var message="hello"
  //console.log(message)
  
//console.log(trex.y)  
  
  
  trex.collide(invisibleground);
//  console.log(trex.y);
  
textSize(20)  ;
text("score="+score,480,20);
 
  
  if(gamestate==="play"){
    
    if(ground.x<0){
    ground.x=ground.width/2;
    
  }
    ground.velocityX=-(5+(score/100)*3);
    score=score+Math.round( frameRate()/30) ;
    
    if(keyDown("space") && trex.y>360){
    trex.velocityY=-8
    jumpsound.play();
    }
    
    trex.velocityY= trex.velocityY+0.5;
    
   obstacles() 
 
  spawnclouds();
 
    gameover.visible=false;
    restart.visible=false;
    
    if(score%100===0 && score>0){
  checkpointsound.play();
    
    }
    
    
    if(trex.isTouching(obstaclegroup)){
      
      //trex.velocityY=-8
    //jumpsound.play();
      
      gamestate="end"
      diesound.play();
      
      
      
      
    }
    
    
  }
  
  else if(gamestate==="end"){
    
    ground.velocityX=0;
    trex.velocityY=0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
   trex.changeAnimation("trexcollided",trexcolide)
  
    gameover.visible=true;
    restart.visible=true;
    if (mousePressedOver(restart)){
      //console.log ("restart")
      reset();
    }
    
  }
  
 
}

function spawnclouds(){
  if(frameCount%80===0){
  clouds = createSprite (600,30,10,10)
  clouds.velocityX=-2
    clouds.addImage("clouds",cloud_image)
    clouds.y=random(0,200)
    clouds.lifetime=300
     cloudgroup.add(clouds)
    
    
  clouds.depth=trex.depth
    trex.depth=trex.depth+1 
    //console.log(clouds.depth)
  //console.log(trex.depth)
  }
  }



 function obstacles(){
   if(frameCount%80===0){
   obstacle = createSprite (600,380,30,30)
   obstacle.velocityX = -6
   obstacle.lifetime=100
  obstacle.scale=0.7;
  obstaclegroup.add(obstacle)  ;
     
     
   var rant = Math.round (random (1,6))
   switch (rant){
       
       case 1: obstacle.addImage(obstacle1) ;
       break ;
       case 2: obstacle.addImage(obstacle2) ;
       break
       case 3 : obstacle.addImage(obstacle3) ;
       break;
       case 4 : obstacle.addImage(obstacle4) ;
       break;
       case 5 : obstacle.addImage(obstacle5) ;
       break;
       case 6 : obstacle.addImage(obstacle6) ;
       break;
       default:break;
       
   }
 } 
}

function reset(){
  gamestate="play";
  gameover.visible = false
  restart.visible = false
  cloudgroup.destroyEach();
  obstaclegroup.destroyEach();
  trex.changeAnimation("trexrunning",treximage);
  score=0;
}

























