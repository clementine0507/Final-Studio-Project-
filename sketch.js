let mic;
let isGameStarted = false;
let soundLevel = 0;
let linePosition; 
let previousPosition; 

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
  })

  linePosition = createVector(width / 2, height / 2); 
  previousPosition = linePosition.copy(); 
}

function draw() {
  if (isGameStarted) {
    soundLevel = mic.getLevel();

    if (soundLevel > 0.01) {
      updateLinePosition();
      drawLine();
    }
  }
}

function mousePressed() {
  if (!isGameStarted) {
    isGameStarted = true;
    background(255);
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