var background1, background1Image, sea, seaImage;
var title1, title2, title1Image, title2Image, welcome, welcomeImage;
var mainFish, mainFishImg, fish1Image, fish2Image, fish3Image, fish4Image, fish5Image, fish6Image, fish1, fish2, fish3;
var level = 0;
var edge1, edge2;
var playButton, playButtonImage;
var treasure, treasureImage;
var invisibleBlock, treasureInvisibeBlock;
var life = 200;
var energy = 200;
var lifeImage, energyImage;

function preload() {
  seaImage = loadImage("./assets/background.png");
  background1Image = loadImage("./assets/background2.png");

  title1Image = loadImage("./assets/title.png");
  title2Image = loadImage("./assets/title2.png");
  welcomeImage = loadImage("./assets/welcome.png");
  playButtonImage = loadImage("./assets/playButton.png");

  mainFishImg = loadImage("./assets/main-fish5.png")

  treasureImage = loadImage("./assets/treasure.png");

  fish1Image = loadImage("./assets/fish1.png");
  fish2Image = loadImage("./assets/fish2.png");
  fish3Image = loadImage("./assets/fish3.png");
  fish4Image = loadImage("./assets/fish4.png");
  fish5Image = loadImage("./assets/fish5.png");
  fish6Image = loadImage("./assets/fish6.png");

  lifeImage = loadImage("./assets/heart.png");
  energyImage = loadImage("./assets/Energy.png")
 
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  background1 = createSprite(width/2, height/2);
  background1.addImage(background1Image);
  background1.scale = 2

  title1 = createSprite(width/2, height/2 - 100);
  title1.addImage(title1Image);
  title1.scale = 2;

  title2 = createSprite(width/3 - 250, 50, 10, 10);
  title2.addImage(title2Image);


  welcome = createSprite(width/2, height/2 + 100);
  welcome.addImage(welcomeImage);


  playButton = createSprite(width - 170, height/2 + 150);
  playButton.addImage(playButtonImage);
  playButton.scale = .7;


  mainFish = createSprite(90, height/2 - 20, 20, 20);
  mainFish.addImage("floating", mainFishImg);

  treasure = createSprite(width + 150, height/2 + 150)
  treasure.addImage(treasureImage);

  sea=createSprite(width/2,height/2 - 70, 100, 100);
  sea.addImage(seaImage);
  sea.scale = 4;


  mainFish.depth = sea.depth;
  mainFish.depth +=1;

  treasure.depth = sea.depth;
  treasure.depth += 1;

  title2.depth = sea.depth;
  title2.depth += 1;

  edge1 = createSprite(width/2, 1, width, 5);
  edge1.visible = false;
  edge1.depth = mainFish.depth;

  edge2 = createSprite(width/2, height-1, width, 20);
  edge2.visible = false;
  edge2.depth = mainFish.depth;

  invisibleBlock = createSprite(50, height/2 - 20, 5500, height);
  invisibleBlock.visible = false;

  treasureInvisibeBlock = createSprite(5650, height/2, 200, height);
  treasureInvisibeBlock.visible = false;
  
}

function draw() {
  background("grey");


  if(level === 0) {
    sea.visible = false;
    mainFish.visible = false;
    treasure.visible = false;

    if(mousePressedOver(playButton)) {
      level = 1;
    }

  }
  
  if(level === 1) {
    sea.visible = true;
    mainFish.visible = true;

    mainFish.collide(edge1);
    mainFish.collide(edge2);
  
    invisibleBlock.velocityX = -3
    treasureInvisibeBlock.velocityX = -3
  
    if(keyDown(UP_ARROW)) {
      mainFish.velocityY -= 1;
    }
    if(keyDown(DOWN_ARROW)) {
      mainFish.velocityY += 1;
    }
  
    mainFish.velocityY += .1;

    if(mainFish.isTouching(treasureInvisibeBlock)) {
      treasure.visible = true;
      treasure.velocityX = -1;
      
    }
  
    if(invisibleBlock.isTouching(mainFish)) {
      spawnFishes();
    }

    showLife();
    energyBar();

  }
  


  drawSprites()
  //text("x: "+ mouseX +"y: "+ mouseY, mouseX, mouseY);


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function spawnFishes() {

    if (frameCount % 365 === 0) {
      var fish1 = createSprite(width+50,height/3-100,40,10);
      fish1.y = Math.round(random(height/2 + 10,height/2 + 100));
      fish1.addImage(fish1Image);
      fish1.scale = .7;
      fish1.velocityX = -5.1;
      
    }

    if (frameCount % 195 === 0) {
      var fish2 = createSprite(width+80,height/3-100,40,10);
      fish2.y = Math.round(random(height/3-40,height/2-100));
      fish2.addImage(fish2Image);
      fish2.scale = 1;
      fish2.velocityX = -4.1;
      
    }

    if (frameCount % 265 === 0) {
      var fish3 = createSprite(width+80,height/3-100,40,10);
      fish3.y = Math.round(random(height/2 + 40,height-80));
      fish3.addImage(fish3Image);
      fish3.scale = 1;
      fish3.velocityX = -4.7
      
    }

    if (frameCount % 415 === 0) {
      var fish4 = createSprite(width+50,height/3-100,40,10);
      fish4.y = Math.round(random(height/3 - 130,height/3 - 70));
      fish4.addImage(fish4Image);
      fish4.scale = .7;
      fish4.velocityX = -2.6;
      
    }
    


}


function showLife() {
  var rect1 = createSprite(width/3 + 50, height/3-150, 200, 20);
  rect1.shapeColor = "white";

  var rect2 = createSprite(width/3 + 50, height/3-150, life, 20);
  rect2.shapeColor = "red";

  //image(lifeImage, 375, 55, 10, 10);
  var heart = createSprite(width/3 - 80, height/3-150, 10, 10);
  heart.addImage(lifeImage);
  heart.scale = .2

}

function energyBar() {
  var rect3 = createSprite(width/3 + 50, height/3-180, 200, 20);
  rect3.shapeColor = "white";

  var rect4 = createSprite(width/3 + 50, height/3-180, life, 20);
  rect4.shapeColor = "yellow";

  //image(lifeImage, 375, 55, 10, 10);
  var energy1 = createSprite(width/3 - 80, height/3-180, 10, 10);
  energy1.addImage(energyImage);
  energy1.scale = .5

}
