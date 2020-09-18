//Create variables here
var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;

function preload()
{
  //load images here for dog and happy dog
  dogImg=loadImage("Images/dogImg.png");
   dogImg1=loadImage("Images/dogImg1.png");
}

function setup() {
  // Adding firebase database
	database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  // Taking database information  through .ref()
  foodStock=database.ref('Food');

  // Creating a listner using .on(), that will keep record of changes
  
  foodStock.on("value",readStock);
  textSize(20);
  
}


function draw() {  

  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Goofy Milk!",130,10,300,20);

}
//Function to read values from Database
function readStock(data){
  foodS=data.val();
}

//Function to write values in Database
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}


