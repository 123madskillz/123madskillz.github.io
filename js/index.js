
var tim = 0;
var happy;
var birthday;
function setup() {
  c = createCanvas(window.innerWidth, window.innerHeight);
  c.position(0, 0);
  happy = loadImage("/images/HppyBirth.png");
  birthday = loadImage("/images/Birth.png");
}
function draw() {
  c = createCanvas(window.innerWidth, window.innerHeight);
  clear();
  drawBg(100, 100);
  tim += 0.1;
  drawCircles(40, 40, 2, 10, 1, 0.5, 30);
  drawCircles(30, 30, 2.5, 34, 1.3, 0.75, 50);
  drawWords();
  drawCircles(20, 20, 4, 100, 2, 1, 60);
}

function drawWords(){
  //happy
  translate(0,height-155);
  push();
  translate(200, 62);
  rotate(sin((tim*1.5)+1.1)/10.0);
  translate(-200, -62);
  image(happy, 0,0, 400,124);
  pop();
  translate(0,(height-155)*-1);
  //bday
  translate(600,height-300);
  push();
  translate(311, 150);
  rotate(sin((tim*1.5)+0)/10.0);
  translate(-311, -150);
  image(birthday, 0, 0, 622, 300);
  pop();
  translate(-600,(height-300)*-1);
}
function drawBg(xS, yS) {
  //strokeCap(PROJECT);
  //strokeWeight(30);
  colorMode(HSB, 255);
  for (var y = 0; y < height; y += yS) {
    for (var x = 0; x < width; x += xS) {
      fill((20+y)%255, 100, 255, distance(x, y, mouseX, mouseY) / 2);
      var size = 60 - (2000 / distance(x, y, mouseX, mouseY));
      rect(x + cos(x * y + tim * 1) * 10, y, size, size);
    }
  }
  fill(40, 150, 255, 200);
  ellipse(mouseX, mouseY, 100, 100);
  for (var i = 0; i < 10; i++) {
    fill(30 + (i * 1), 255, 255, 20 - (i * 2));
    ellipse(mouseX, mouseY, 150 + (i * 50), 150 + (i * 50));
  }
}

function drawCircles(xS, yS, h, speed, freq, amp, alpha) {
  colorMode(HSB, 255);
  //draw water bubbles
  noStroke();
  for (var x = 0; x < width; x += xS) {
    for (var y = 0; y < yS * 5; y += yS) {
      fill(132, 255, 255 - (sin((tim * 1) + x + y + (sin(x / y)) * 100) * 50), alpha);
      var vX = (x * freq) + (tim * speed);
      var xPos = x;
      var yPos = height - ((y * ((sin(vX / 100.0) * amp) + h) / 2.0) / 2) - 7;
      var size = xS + sin(tim + y + sin(x) * 30) * 10 + (sin(vX / 100.0) + 1) * 10;
      ellipse(xPos, yPos, size, size);
    }
  }
  //draw sin wave
  strokeCap(SQUARE);
  var y = yS * 5;
  strokeWeight(10);
  for (var x = 0; x < width; x += xS) {
    stroke(130, 255, 200, alpha);
    var xN = x + xS;
    var vX = (x * freq) + (tim * speed);
    var vXN = ((xN) * freq) + (tim * speed);

    var yPos = height - ((y * ((sin(vX / 100.0) * amp) + h) / 2.0) / 2) - 7;
    var yPosN = height - ((y * ((sin(vXN / 100.0) * amp) + h) / 2.0) / 2) - 7;
    var size = 10;

    line(x, yPos, xN, yPosN);
  }
  noStroke();
}

function distance(inx, iny, nx, ny) {
  return sqrt((inx - nx) * (inx - nx) + (iny - ny) * (iny - ny));
}
