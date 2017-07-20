var gTime; //Global time
var fire; //list of current fireworks
var pressed;
var speed = 10;
function setup() {
  c = createCanvas(window.innerWidth, window.innerHeight);
  c.position(0, 0);
  gTime = 0;
  fire = [];
  pressed = false;
  background(0);
}

function draw() {
  blendMode(BLEND)
  colorMode(HSB, 255);
  fill(0, 0, 0, 100);
  rect(0, 0, width, height)
  renderStars()
  fire = update(fire);
  //stars();
  renderFire(fire);
  if ((touches.length > 0 || mouseIsPressed) && !pressed) {
    fire.push(
      createFire(
        0,
        touches.length > 0 ? touches[0].x : mouseX,
        height,
        random(-8, 8),
        random(50, 80),
        random(0, 255),
        random(155, 255),
        random(200, 255)
      )
    );
  }
  if(random(0,100)<4){
    fire.push(
      createFire(
        0,
        random(0,width),
        height,
        random(-8, 8),
        random(50, 80),
        random(0, 255),
        random(155, 255),
        random(200, 255)
      )
    );
  }
}
function createFire(t, x, y, xVel, yVel, h0, s0, b0) {
  pressed = true;
  return {
    hue: h0,
    sat: s0,
    bri: b0,
    type: t,
    state: 0, //0 is for rocket state, 1 for explosion, 2 for gas state
    iTime: 0, //increases by one every frame and changes state and then resets when needed
    x: x,
    y: y,
    xVel: xVel,
    yVel: yVel,
    size: random(3, 7),

    hDelta: random(0, 100)
  };
}
function mouseReleased() {
  pressed = false;
}
function update(f) {
  for (var i = 0; i < f.length; i++) {
    if (f[i].type == 0) {
      if (f[i].state == 0) {
        f[i].iTime += 1;
        if (f[i].iTime > random(50, 200)) f[i].state += 1;
        f[i].x += f[i].xVel / speed;
        f[i].y -= f[i].yVel / speed;
        f[i].yVel -= 9.8 / speed;
      } else if (f[i].state == 1) {
        if (random(0, 100) < 50) {
          parts = random(5, 10);
          for (var z = 0; z < parts; z++) {
            f.push(
              createFire(
                10,
                f[i].x,
                f[i].y,
                20 * sin(parts / z * 2 * PI),
                20 * cos(parts / z * 2 * PI) + 15,
                f[i].hue,
                f[i].sat,
                f[i].bri
              )
            );
          }
        } else {
          parts = 100;
          for (var z = 0; z < parts; z++) {
            a = random(0, 1);
            b = random(0, 1);
            c = a;
            if (b < a) {
              a = b;
              b = c;
            }
            f.push(
              createFire(
                11,
                f[i].x,
                f[i].y,
                random(1, 20) * sin(parts / z * 2 * PI),
                random(1, 20) * cos(parts / z * 2 * PI) + 15,
                f[i].hue,
                f[i].sat,
                f[i].bri
              )
            );
          }
        }
        f.splice(i, 1);
      }
    } else {
      if (f[i].state == 0) {
        f[i].iTime += 1;
        if (f[i].iTime > 100) f[i].state += 1;
        f[i].x += f[i].xVel / speed;
        f[i].y -= f[i].yVel / speed;
        f[i].yVel -= 9.8 / speed;
      } else {
        f.splice(i, 1);
      }
    }
  }
  return f;
}

function renderFire(fire) {
  ;
  blendMode(ADD);
  for (var i = 0; i < fire.length; i++) {
    var z = fire[i];
    if (z.type == 0) renderGeneric(z);
    if (z.type == 10) renderParticle(z, 10);
    if (z.type == 11) renderParticle(z, z.size);
  }
}
function renderGeneric(f) {
  colorMode(HSB, 255);
  fill(f.hue, 50, 255);
  noStroke();
  ellipse(f.x, f.y, 5, 5);
}

function renderParticle(f, s) {
  colorMode(HSB, 255);
  fill(f.hue, min(f.sat+100,255), 255, max(10, 255 - f.iTime * 3));
  noStroke();
  ellipse(f.x, f.y, s, s);
}

function renderStars(){
  for( var z = 0; z < height; z +=3){
    fill(((-z+3500)/18),200,40,50)
    rect(0,z*2,width,4)
  }
}