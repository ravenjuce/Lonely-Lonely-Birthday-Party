let rate2 = 1.369;
var creams = [];
let containerChoice;
let flag = false;

var containerCream;
var containerMatcha;
var containerMint;
var containerStrawberry;
var containerMango;

var squeezerGrape;
var squeezerMatcha;
var squeezerMint;
var squeezerStrawberry;
var squeezerMango;
var squeezerChocolate;
var squeezerOrange;
var squeezerPeach;
var squeezerSweet;

var redStrawberry;
var pinkStrawberry;
var cherry;

class Squeezer {
  constructor(x, y, d, colour) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.colour = colour;
    this.oriX = this.x;
    this.oriY = this.y;
  }

  move() {
    if (dist(mouseX, mouseY, this.x, this.y)<=this.d/2) {
      this.d = 100

      if (mouseIsPressed) {
        this.x = mouseX;
        this.y = mouseY;    
      } 
      
    } else {
      this.d = 50;
    }
  }

  display() {

    stroke(255);
    strokeWeight(4);
    fill(255, 100);
    triangle(this.x+(this.d/3), this.y-(this.d/3), 
             this.x+(this.d/3), this.y-(this.d/3)-(this.d/2)*rate2, 
             this.x+(this.d/3)+(this.d/2)*rate2, this.y-(this.d/3));

    circle(this.x, this.y, this.d);

    stroke(255,150);
    fill(this.colour);
    // 205, 159, 204
    triangle(this.x-4*this.d/3, this.y+4*this.d/3, 
             this.x-this.d/2/rate2, this.y-this.d/2/rate2, 
             this.x+this.d/2/rate2, this.y+this.d/2/rate2);  

  }

  paint() {
    
    if ((this.x-4*this.d/3>width/2-285 && this.x-4*this.d/3<width/2+285 && this.y+4*this.d/3>2*height/3-20-60-30 && this.y+4*this.d/3<2*height/3-20+60+10) || 
    (this.x-4*this.d/3>width/2-285 && this.x-4*this.d/3<width/2+285 && this.y+4*this.d/3>2*height/3-20-60+(7*height/8-5-2*height/3) && this.y+4*this.d/3<2*height/3-20+60+(7*height/8-5-2*height/3)+30)
    ) {
      var testCream = new Cream(this.x-4*this.d/3, this.y+4*this.d/3+30, this.colour);
      testCream.makeCream();
      
      if (!mouseIsPressed){
        creams.push(new Cream(this.x-4*this.d/3, this.y+4*this.d/3+30, this.colour));
      }   
    } else {
      if (!mouseIsPressed) {
        this.x = this.oriX;
        this.y = this.oriY;
      }   
    }
    
  } 
}

class Container {
  constructor(name, x, y, d, s, c, colour) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.d = d;
    this.s = s;
    this.c = c;
    this.colour = colour;
    this.origX = x;
    this.origY = y;
  }

  move() {
    if ((mouseX>this.x-this.d/2 && mouseX<this.x+this.d/2 && mouseY>this.y-this.d && mouseY<this.y)) {
      this.d = 170;
      let origX = this.x;
      let origY = this.y;
      if (mouseIsPressed) {
        this.x = mouseX;
        this.y = mouseY+100;    
      } else {
        this.x = this.origX;
        this.y = this.origY;
      }
    } else {
      this.d = 120;
    }
  }

  display() {
    if ((mouseX>this.x-this.d/2 && mouseX<this.x+this.d/2 && mouseY>this.y-this.d && mouseY<this.y) && this.c != 0) {
      containerChoice = this.name;  
    } 

    if (this.c == 0) {
      makeSponge(color(250, 245, 231));
      makeTopping(this.colour);
    }
    let minusX = 0;
    let minusY = 0;
    if (this.x>width/2-285+100 && this.x<width/2+285 && this.y>2*height/3-20-60-30 && this.y<2*height/3-20+160) {
      push();
      translate(this.x, this.y);
      rotate(-PI/4);
      minusX = this.x;
      minusY = this.y;

      if (!mouseIsPressed) {
        this.c = 0;
      }
    }

    
    noFill();
    // bottom
    strokeWeight(this.s);
    stroke(255);
    ellipse(this.x-minusX, this.y-minusY, this.d, this.d/5);

    // cream or other
    strokeWeight(3*this.s/4);
    stroke(this.colour);
    fill(this.colour);
    ellipse(this.x-minusX, this.y-this.s-minusY, this.d-2*this.s, (this.d-2*this.s)/5);
    noStroke();
    rect(this.x-(this.d-2*this.s)/2-minusX, this.y-this.c*this.d-minusY, this.d-2*this.s, this.c*this.d-this.s);
    strokeWeight(3*this.s/4);
    stroke(this.colour);
    ellipse(this.x-minusX, this.y-this.c*this.d-minusY, this.d-2*this.s, (this.d-2*this.s)/5);
    line(this.x-(this.d/2-this.s)-minusX, this.y-this.c*this.d-minusY, this.x-(this.d/2-this.s)-minusX, this.y-this.s-minusY);
    line(this.x+(this.d/2-this.s)-minusX, this.y-this.c*this.d-minusY, this.x+(this.d/2-this.s)-minusX, this.y-this.s-minusY);

    noFill();
    // top
    strokeWeight(this.s);
    stroke(255);
    ellipse(this.x-minusX, this.y-this.d-minusY, this.d, this.d/5);

    line(this.x-this.d/2-minusX, this.y-this.d-minusY, this.x-this.d/2-minusX, this.y-minusY);
    line(this.x+this.d/2-minusX, this.y-this.d-minusY, this.x+this.d/2-minusX, this.y-minusY);

    pop();
  }
}

class Cream {
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour;
  }

  makeCream() {
    stroke(this.colour )
    fill(this.colour);
    ellipse(this.x, this.y, 50, 30);
    
    point(this.x-24.5, this.y-3.5);
    point(this.x, this.y-30);
    point(this.x+24.5, this.y-3.5);
  
    beginShape();
    curveVertex(this.x-24.5, this.y-3.5);
    curveVertex(this.x-24.5, this.y-3.5);
    curveVertex(this.x, this.y-30);
    curveVertex(this.x+24.5, this.y-3.5);
    curveVertex(this.x+24.5, this.y-3.5);
    endShape();
  }
}

class Snack {
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.oriX = x;
    this.oriY = y;
  }

  makeCherry() {
    noFill();
    stroke(0);
    // curve(73+30-68, 24+2, 73+30, 24, 73, 131, 73-58, 131+4);
    curve(this.x+30-68, this.y-80+2, this.x+30, this.y-30-100, this.x, this.y-30, this.x-58, this.y+4);
    curve(this.x+30-68, this.y-80+2, this.x+30, this.y-30-100, this.x+80, this.y-30, this.x-58, this.y+4);
    line(this.x+30-15, this.y-30-100+5, this.x+30+15, this.y-30-100-5)

    fill(this.colour);
    stroke(this.colour);
    ellipse(this.x, this.y, 60)
    ellipse(this.x+80, this.y-5, 60)

    stroke(255);
    arc(this.x, this.y, 50, 50, -1, QUARTER_PI-1);
    arc(this.x, this.y, 50, 50, QUARTER_PI-1+0.4, QUARTER_PI-0.5);
    arc(this.x+80, this.y-5, 50, 50, -1, QUARTER_PI-1);
    arc(this.x+80, this.y-5, 50, 50, QUARTER_PI-1+0.4, QUARTER_PI-0.5);

  }
 
  moveCherry() {
    if (dist(mouseX, mouseY, this.x, this.y)<=60 && mouseIsPressed) {
      this.x = mouseX;
      this.y = mouseY;     
    }

    if (dist(mouseX, mouseY, this.x+80, this.y-5)<=60 && mouseIsPressed) {
      this.x = mouseX-80;
      this.y = mouseY+5;     
    }

    if ((this.x < width/2-285 || this.x+80 > width/2+285 || this.y < 2*height/3-20-60 || this.y > 2*height/3-20+60+(7*height/8-5-2*height/3)+30) && !mouseIsPressed) {
      this.x = this.oriX;
      this.y = this.oriY;
    }
  }

  makeStrawberry() {
    
    fill(this.colour);
    stroke(this.colour);
    ellipse(this.x, this.y, 90, 60);
  
    beginShape();
    curveVertex(this.x-44.5, this.y-6);
    curveVertex(this.x-44.5, this.y-6);
    curveVertex(this.x, this.y-60);
    curveVertex(this.x+44.5, this.y-6);
    curveVertex(this.x+44.5, this.y-6);
    endShape();
  
    fill(255, 188, 66);
    noStroke();
    ellipse(this.x, this.y, 5, 7);
    ellipse(this.x-15, this.y-25, 5, 7);
    ellipse(this.x+13, this.y+4, 5, 7);
    ellipse(this.x-20, this.y+7, 5, 7);
    ellipse(this.x+5, this.y-40, 5, 7);
    ellipse(this.x+18, this.y-20, 5, 7);
    ellipse(this.x-5, this.y-15, 5, 7);
    ellipse(this.x-23, this.y-10, 5, 7);
    ellipse(this.x+30, this.y-4, 5, 7);
  }

  moveStrawberry() {
    if (dist(mouseX, mouseY, this.x, this.y-30)<=70 && mouseIsPressed) {

      this.x = mouseX;
      this.y = mouseY; 
        
    }

    if ((this.x < width/2-285 || this.x > width/2+285 || this.y < 2*height/3-20-60 || this.y > 2*height/3-20+60+(7*height/8-5-2*height/3)+30) && !mouseIsPressed) {
      this.x = this.oriX;
      this.y = this.oriY;
    }
  }

}


function setup() {
  // create the canvas (1200px wide, 800px high)
  createCanvas(1200, 800);

  // draw a border to help you see the size
  // this isn't compulsory (remove this code if you like)
  strokeWeight(4);
  rect(0, 0, width, height);


  containerCream = new Container("cream", 70, 230, 120, 3, 0.8, color(255, 229, 212));
  containerStrawberry = new Container("strawberry", 220, 230, 120, 3, 0.75, color(252, 188, 184));
  containerMango = new Container("mango", 370, 230, 120, 3, 0.8, color(255, 217, 114));
  containerMatcha = new Container("matcha", 520, 230, 120, 3, 0.7, color(193, 219, 179));
  containerMint = new Container("mint", 670, 230, 120, 3, 0.9, color(199, 234, 228));
  
  squeezerMango = new Squeezer(100, 705, 70, color(255, 224, 102));
  squeezerChocolate = new Squeezer(100, 600, 70, color(65, 39, 34));
  squeezerPeach = new Squeezer(100, 495, 70, color(255, 217, 218));
  squeezerSweet = new Squeezer(100, 390, 70, color(255));

  squeezerGrape = new Squeezer(1130, 705, 70, color(205, 159, 204));
  squeezerMatcha = new Squeezer(1130, 600, 70, color(112, 193, 179));
  squeezerMint = new Squeezer(1130, 495, 70, color(36, 123, 160));
  squeezerOrange = new Squeezer(1130, 390, 70, color(243, 146, 55));
  squeezerStrawberry = new Squeezer(1130, 285, 70, color(242, 95, 92));

  redStrawberry = new Snack(800, 230, color(222, 60, 75));
  pinkStrawberry = new Snack(900, 230, color(255, 214, 224));
  cherry = new Snack(1000, 230, color(236, 87, 102));


  // 254, 255, 190 cream
  

}

function draw() {
  // your cool workstation code goes in this draw function
  background(255);
  makeWall();
  makeTable();
  makeTray();
  makeSponge(color(255, 193, 94));
  
  

  containerCream.display();
  containerMatcha.display();
  containerMint.display();
  containerStrawberry.display();
  containerMango.display();

  if (containerChoice == "cream") {
    containerCream.move();
    containerCream.display();
  } else if (containerChoice == "matcha") {
    containerMatcha.move();
    containerMatcha.display();
  } else if (containerChoice == "mint") {
    containerMint.move();
    containerMint.display();
  } else if (containerChoice == "strawberry") {
    containerStrawberry.move();
    containerStrawberry.display();
  } else if (containerChoice == "mango") {
    containerMango.move();
    containerMango.display();
  }


  for (let i = 0; i < creams.length; i++) {
    creams[i].makeCream();
  }

  if (flag) {
    makeCandle(width/2, 2*height/3-20-20);
  }
  

  squeezerGrape.display();
  squeezerGrape.move();
  squeezerGrape.paint();

  squeezerMatcha.display();
  squeezerMatcha.move();
  squeezerMatcha.paint();

  squeezerMint.display();
  squeezerMint.move();
  squeezerMint.paint();

  squeezerStrawberry.display();
  squeezerStrawberry.move();
  squeezerStrawberry.paint();

  squeezerMango.display();
  squeezerMango.move();
  squeezerMango.paint();

  squeezerChocolate.display();
  squeezerChocolate.move();
  squeezerChocolate.paint();

  squeezerOrange.display();
  squeezerOrange.move();
  squeezerOrange.paint();

  squeezerPeach.display();
  squeezerPeach.move();
  squeezerPeach.paint();

  squeezerSweet.display();
  squeezerSweet.move();
  squeezerSweet.paint();

  redStrawberry.makeStrawberry();
  pinkStrawberry.makeStrawberry();
  redStrawberry.moveStrawberry();
  pinkStrawberry.moveStrawberry();

  cherry.makeCherry();
  cherry.moveCherry()

  

}


function makeTopping(toppingColour) {
  stroke(toppingColour);
  strokeWeight(5);
  fill(toppingColour);
  ellipse(width/2, 2*height/3-20, 570, 120);
  stroke(255, 150);
  strokeWeight(30);
  stroke(toppingColour);
  strokeWeight(5);
  beginShape();
  curveVertex(width/2-285, 2*height/3-20);
  curveVertex(width/2-285, 2*height/3-20);
  curveVertex(width/2-285-10, 2*height/3-20+100);
  curveVertex(width/2-285+30, 2*height/3-20+120);
  curveVertex(width/2-285+40, 2*height/3-20+60);

  curveVertex(width/2-285+80, 2*height/3-20+65);
  curveVertex(width/2-285+70, 2*height/3-20+130);
  curveVertex(width/2-285+120, 2*height/3-20+140);
  curveVertex(width/2-285+120, 2*height/3-20+80);

  curveVertex(width/2-285+165, 2*height/3-20+85);
  curveVertex(width/2-285+160, 2*height/3-20+150);
  curveVertex(width/2-285+220, 2*height/3-20+150);
  curveVertex(width/2-285+210, 2*height/3-20+85);

  curveVertex(width/2-285+270, 2*height/3-20+80);
  curveVertex(width/2-285+265, 2*height/3-20+155);
  curveVertex(width/2-285+310, 2*height/3-20+160);
  curveVertex(width/2-285+305, 2*height/3-20+85);

  curveVertex(width/2-285+350, 2*height/3-20+85);
  curveVertex(width/2-285+345, 2*height/3-20+155);
  curveVertex(width/2-285+400, 2*height/3-20+150);
  curveVertex(width/2-285+390, 2*height/3-20+80);

  curveVertex(width/2-285+440, 2*height/3-20+90);
  curveVertex(width/2-285+435, 2*height/3-20+150);
  curveVertex(width/2-285+490, 2*height/3-20+140);
  curveVertex(width/2-285+485, 2*height/3-20+70);

  curveVertex(width/2-285+530, 2*height/3-20+60);
  curveVertex(width/2-285+530, 2*height/3-20+140);
  curveVertex(width/2-285+580, 2*height/3-20+130);
  curveVertex(width/2+285, 2*height/3-20);
  curveVertex(width/2+285, 2*height/3-20);
  endShape();
}

function makeSponge(spongeColour) {
  fill(spongeColour);

  // bottom
  strokeWeight(4);
  stroke(247, 176, 91);
  ellipse(width/2, 7*height/8-5, 550, 100);

  noStroke();
  rect(width/2-275, 2*height/3, 550, 7*height/8-5-2*height/3 );

  // top
  strokeWeight(4);
  stroke(247, 176, 91);
  ellipse(width/2, 2*height/3, 550, 100);

}

function makeTray() {
  strokeWeight(5);
  stroke(255);
  fill(187, 189, 246, 80);
  ellipse(width/2, 7*height/8, 700, 150);
  ellipse(width/2, 7*height/8-5, 700, 150);
}

function makeTable() {
  noStroke();
  fill(250, 240, 240);
  rect(0, height/4, width, 3*height/4);
}

function makeWall() {
  noStroke();
  fill(248, 240, 231);
  rect(0, 0, width, height/3);

  fill(219, 84, 97, 50);
  for(let i = 0; i<height; i+=60) {
    rect(0, i, width, 30);
  }
  for(let i = 0; i<width; i+=60) {
    rect(i, 0, 30, height);
  }
}

function makeCandle(x, y) {
  // noStroke();
  stroke(255);
  // fill(152, 131, 229);
  // ellipse(x, y, 50, 10);
  // rect(x-25, y-30, 50, 30);
  // ellipse(x, y-30, 50, 10);

  // fill(92, 200, 255);
  // ellipse(x, y-30, 50, 10);
  // rect(x-25, y-60, 50, 30);
  // ellipse(x, y-60, 50, 10);

  // fill(11, 201, 205);
  // ellipse(x, y-60, 50, 10);
  // rect(x-25, y-90, 50, 30);
  // ellipse(x, y-90, 50, 10);

  // fill(0, 145, 110);
  // ellipse(x, y-90, 50, 10);
  // rect(x-25, y-120, 50, 30);
  // ellipse(x, y-120, 50, 10);

  // fill(255, 207, 0);
  // ellipse(x, y-120, 50, 10);
  // rect(x-25, y-150, 50, 30);
  // ellipse(x, y-150, 50, 10);

  // fill(238, 97, 35);
  // ellipse(x, y-150, 50, 10);
  // rect(x-25, y-180, 50, 30);
  // ellipse(x, y-180, 50, 10);

  // fill(250, 0, 63);
  // ellipse(x, y-180, 50, 10);
  // rect(x-25, y-210, 50, 30);
  // ellipse(x, y-210, 50, 10);

  fill(241, 227, 243);
  ellipse(x, y, 50, 10);
  noStroke();
  rect(x-25, y-30, 50, 30);
  ellipse(x, y-30, 50, 10);

  fill(255, 211, 218);
  ellipse(x, y-30, 50, 10);
  rect(x-25, y-60, 50, 30);
  ellipse(x, y-60, 50, 10);

  fill(241, 227, 243);
  ellipse(x, y-60, 50, 10);
  rect(x-25, y-90, 50, 30);
  ellipse(x, y-90, 50, 10);

  fill(255, 211, 218);
  ellipse(x, y-90, 50, 10);
  rect(x-25, y-120, 50, 30);
  ellipse(x, y-120, 50, 10);

  fill(241, 227, 243);
  ellipse(x, y-120, 50, 10);
  rect(x-25, y-150, 50, 30);
  ellipse(x, y-150, 50, 10);

  fill(255, 211, 218);
  ellipse(x, y-150, 50, 10);
  rect(x-25, y-180, 50, 30);
  stroke(255);
  ellipse(x, y-180, 50, 10);

  // fill(241, 227, 243);
  // ellipse(x, y-180, 50, 10);
  // rect(x-25, y-210, 50, 30);
  
  // ellipse(x, y-210, 50, 10);


  stroke(255);
  line(x, y-210+30, x, y-230+30)

  noStroke();
  fill(245, 212, 213, 150);
  ellipse(x, y-230-40+30, sin(frameCount/20)*5+50, sin(frameCount/20)*5+80);

  fill(255, 214, 224, 150);
  ellipse(x, y-230-35+30, sin(frameCount/20)*4+40, sin(frameCount/20)*4+70);

  fill(250, 222, 209, 150);
  ellipse(x, y-230-30+30, sin(frameCount/20)*3+30, sin(frameCount/20)*3+60);

  fill(255, 239, 159, 150);
  ellipse(x, y-230-25+30, sin(frameCount/20)*2+20, sin(frameCount/20)*2+50);

  fill(255, 217, 114, 150);
  ellipse(x, y-230-15+30, sin(frameCount/20)*2+10, sin(frameCount/20)*2+30);

}

function keyPressed(){
  if (keyCode === ENTER){ 
    flag = true;
  }  
  
}


// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
  
}

