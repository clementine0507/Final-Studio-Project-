let mic;
let isGameStarted = false;
let soundLevel = 0;
let linePosition;
let previousPosition;

let balls = [];

let clearButton;
let paoSound;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);

  text('Sound is your paintbrush.', width / 2, height / 2);

  mic = new p5.AudioIn();
  
  userStartAudio().then(() => {
    mic.start();
  });

  linePosition = createVector(width / 2, height / 2);
  previousPosition = linePosition.copy();

  paoSound = loadSound('mp4/pao.mp3');

  for (let i = 0; i < 10; i++) {
    balls.push(createBall());
  }

  clearButton = createButton('Clear');
  clearButton.position(20, 20);
  clearButton.mousePressed(clearCanvas);
  
  clearButton.hide();
}

function draw() {
  if (isGameStarted) {
    soundLevel = mic.getLevel();

    let bgR = map(soundLevel, 0, 1, 255, 100);
    let bgG = map(soundLevel, 0, 1, 200, 50);
    let bgB = map(soundLevel, 0, 1, 150, 255);

    fill(bgR, bgG, bgB, 30);
    noStroke();
    rect(0, 0, width, height);

    checkBallCollision();

    if (soundLevel > 0.01) {
      updateLinePosition();
      drawLine();
    }

    for (let ball of balls) {
      drawBall(ball);
    }
  }
}

function mousePressed() {
  if (!isGameStarted) {
    isGameStarted = true;
    background(255);
    clearButton.show();
  }
}

function updateLinePosition() {
  let angle = random(TWO_PI);  
  let speed = map(soundLevel, 0, 1, 10, 50);  

  linePosition.x += cos(angle) * speed;
  linePosition.y += sin(angle) * speed;

  linePosition.x = constrain(linePosition.x, 0, width);
  linePosition.y = constrain(linePosition.y, 0, height);
}

function drawLine() {
  let r = random(0, 0); 
  let g = random(150, 255); 
  let b = random(150, 255); 
  stroke(r, g, b); 
  strokeWeight(map(soundLevel, 0, 1, 2, 15));
  
  line(previousPosition.x, previousPosition.y, linePosition.x, linePosition.y);

  previousPosition.x = linePosition.x;
  previousPosition.y = linePosition.y;
}

function createBall() {
  let margin = 100;

  let x = random(width / 4, 3 * width / 4);
  let y = random(height / 4, 3 * height / 4);

  let ball = {
    position: createVector(x, y),
    radius: random(20, 50),
  };
  return ball;
}

function drawBall(ball) {
  fill(255, 0, 0);
  noStroke();
  ellipse(ball.position.x, ball.position.y, ball.radius * 2);
}

function checkBallCollision() {
  for (let i = balls.length - 1; i >= 0; i--) {
    let ball = balls[i];

    let distToBall = dist(linePosition.x, linePosition.y, ball.position.x, ball.position.y);

    if (distToBall < ball.radius) {
      if (paoSound.isPlaying()) {
        paoSound.stop();
      }
      paoSound.play(0, 1, 1);

      balls.splice(i, 1);
      balls.push(createBall());
    }
  }
}

function clearCanvas() {
  background(255);
  linePosition = createVector(width / 2, height / 2);
  previousPosition = linePosition.copy();
}