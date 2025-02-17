# Final project
It's too much content, so I'm adding all the assignments after feedback to this repository. [The first week's repository is accessed from here.](https://github.com/clementine0507/Studio-Project/blob/main/README.md)

URL:https://clementine0507.github.io/Final-Studio-Project-/

## After feedback-New idea and work
I realized that the interactivity in my current code is still somewhat limited. Reflecting on Sol LeWitt’s work, particularly his Wall Drawing #260, I was inspired by the way LeWitt allowed other artists to create based on his instructions, resulting in an artwork that is highly interactive. Building on this idea, I want to incorporate lines as the foundation of my code and invite users to engage in the creation process. However, unlike LeWitt, I want users to interact with the artwork not through their hands but through a unique medium.
![image](https://github.com/user-attachments/assets/29176b9b-4e12-49ac-b0c1-f019d3ae261f)

In my previous assignment, during Workshop 9, I learned how to access the user’s camera to create interactive content. Given that p5.js can also access the user’s microphone, it led me to wonder—can sound levels control the shape of a line, turning it into a dynamic drawing tool? I’ve played games before where sound controls gameplay elements, which inspired me to experiment with using the volume of the user’s voice to manipulate the lines and shapes on the canvas. This is the direction I plan to explore.

Some inspirations about sound:

- We may casually mention an item, and next thing we know, our phones are listening and pushing related content to us. At first glance, this might seem like a helpful feature, making our lives more convenient. But beneath the surface, it often stirs up a sense of discomfort. We rely on our phones so much that it’s hard to imagine life without them, but this constant connection also means they’re always gathering our data, especially when we’re talking to others. If we mention something personal, is it being recorded? Are our words and details being collected and analyzed without us even realizing it? This raises a serious question: how much control do we really have over our privacy? The idea of being silently listened to can make us feel uneasy.

- In light of this, I want to challenge this feeling of unease by using sound itself to create art. I don't want sound to be a tool for surveillance; instead, I want to turn it into a creative force. Unlike the passive data collection by our phones, creating with code requires the user's active consent. In this process, sound becomes a voluntary medium, not just something that’s collected. I aim to reverse this technological trend and offer sound more respect, both as a medium and on an emotional level.

- To me, sound is a powerful, almost magical force—it transcends distance and connects us. Whether it’s a song or a simple conversation, sound lets us exchange information, emotions, and ideas. Through language, we communicate, and through tone, we convey our feelings. Ultimately, sound forms the connection between us and the world, and between us and each other. In my work, I want to use my voice to let sound become the source of creation. The code will capture the traces left by my voice, not just as a formal representation of sound, but as the marks of its presence and influence in space. Each line drawn by sound will be a reminder of its “visit,” with a unique character and life of its own.

I still needed chatgpt's help due to some technical requirements, so I went ahead and told him what I wanted to achieve and asked him to give me some ideas and formats for writing the code:
![fdeadfd8eab6adae818990d882256de](https://github.com/user-attachments/assets/b9e50bd9-e837-4a31-abc9-de740e021d25)
![275332ebcde0527e701ffba16f05998](https://github.com/user-attachments/assets/972f2748-6feb-4d4d-b3a2-714666ea65fa)

Based on the ideas that chatgpt put together for me, I started trying the code over and over again, and here is the successful version of the code along with the ideas:

Before drawing the start of the game, I wanted to have a text with a guide for the user to easily understand, and then click on it before it starts capturing the sound.
```Javascript
  text('Sound is your paintbrush.', width / 2, height / 2); 

  mic = new p5.AudioIn(); 
  userStartAudio().then(() => {
    mic.start();  // turn on the microphone
  })
```
- Games are typically fullscreen, so I adopted a fullscreen approach, making the canvas match the window size. Then, I created a microphone input object to access the user's microphone permissions and capture audio signals.

- When the user clicks anywhere on the canvas, the drawing process begins, and the text on the screen is cleared.

In the initial implementation, I encountered many issues, particularly with capturing audio. For example, the sound was too quiet to trigger the drawing of the lines, or the lines moved too slowly. But as I continued to explore, I began to think about what kind of effect I actually wanted for the lines. I wanted the lines to move freely, as if they were dancing to the rhythm of the sound.

At the same time, I realized that emotions played an important role in the creation process. Therefore, I decided to link the volume of the sound to the thickness of the lines. The intensity of the sound determines the thickness of the lines `strokeWeight(map(soundLevel, 0, 1, 2, 15)`, while the sound emitted by the user controls the speed of the line drawing. This is not limited to speaking or singing; any human-generated noise can also influence the appearance of the lines.
```Javascript
function updateLinePosition() {
  let angle = random(TWO_PI); 
  let speed = map(soundLevel, 0, 1, 10, 50); 
```
The complete code:
URL from [p5.js](https://editor.p5js.org/wtan387/full/AMWCapz7M)

```Javascript
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
```
What the code looks like when it starts running：
![image](https://github.com/user-attachments/assets/fd340085-fec5-4edb-bcb2-eb015c382b0e)

Some reflections after using chatgpt learning:

During the process of learning to code, even though I hadn't mastered many technical terms, with the guidance of ChatGPT, I learned how to use the microphone as an audio input source, capture real-time audio signals through the `p5.AudioIn()` function, and request the user's microphone permission. I also experimented with controlling the speed of line movement based on the intensity of sound, where the louder the sound, the faster the line moves. By using mathematical functions like `random()`, `cos()`, and `sin()`, I was able to make the lines move randomly across the canvas, thus closely linking the drawing process with sound changes.

This led me to reflect on the relationship between sound and artistic creation. Normally, art is expressed visually, but in this piece, sound becomes a medium interacting with lines and colors. It's as if sound is an invisible force that can affect our emotions and cognition through different frequencies and intensities (though this is a somewhat rigid interpretation of how I translated it into code). I’ve experienced the magic and charm of sound. Every tiny fluctuation in sound can leave a unique trace on the canvas, creating an artistic expression that is unlike any other.

### Continue to develop my work
My current code lacks strong guidance. After some thought, I would like to incorporate new interactive elements, rather than focusing solely on drawing.

Some ideas:
- The background also changes color in response to the level of the sound.
- The color of the lines will also change.
- Add some elements to make the lines chase them.
- Step-by-step painting, where the user can choose to paint next and then combine them.

I initially attempted to incorporate a feature that controls background color changes through sound, enabling the background color to dynamically fill based on the detected sound intensity. After several attempts, I found that the background color remained predominantly red and did not transition to a deeper shade of red.
```Javascript
let soundLevel = 0;

function draw() {
  if (isGameStarted) {
    soundLevel = mic.getLevel(); 

    let bgR = map(soundLevel, 0, 1, 255, 100);
    let bgG = map(soundLevel, 0, 1, 200, 50); 
    let bgB = map(soundLevel, 0, 1, 150, 255);

    fill(bgR, bgG, bgB, 30);
    noStroke();
    rect(0, 0, width, height);
```

I believe the most critical and problematic step was actually the addition of the small balls. My intention was to use these small balls to guide users in their creative process, but I had to debug the positioning of the balls multiple times.

Initially, the number of small balls was limited, and they were scattered across the canvas. Since the line primarily moves randomly from the center, it was extremely difficult for the line to touch the balls. To address this, I adjusted the generation position and quantity of the balls. I increased the number of balls and restricted their generation to the central area of the canvas. This significantly improved the efficiency of interaction.
```Javascript
let x = random(width / 4, 3 * width / 4);
let y = random(height / 4, 3 * height / 4);
```

On the other hand, I added a feature where if a ball collides with the line, the ball is deleted and a new ball is regenerated (somewhat similar to the mechanics of Pac-Man). To make the interaction more fun, I downloaded a bubble sound effect from a music software and used it as the sound effect when a ball disappears.
```Javascript
paoSound = loadSound('mp4/pao.mp3');

function checkBallCollision() {
  for (let i = balls.length - 1; i >= 0; i--) {
    let ball = balls[i];

    let distToBall = dist(linePosition.x, linePosition.y, ball.position.x, ball.position.y);

    if (distToBall < ball.radius) {
      if (paoSound.isPlaying()) {
        paoSound.stop(); 
      }
      paoSound.play(0, 1, 1); 

      // Remove the ball and regenerate a new one.
      balls.splice(i, 1);  // Remove the ball from the array
      balls.push(createBall());  // Regenerate a new ball
    }
  }
}
```
Actually, by this point, my focus was no longer on painting with sound. What I really want to emphasize is a kind of indescribable awkwardness I feel. Normally, when I'm alone, I don't talk to my phone because it makes me feel strangely self-conscious. For me, this little sound interaction game is also a kind of challenge. It's not that I'm afraid of being listened to, but more like the feeling of being caught off guard if someone were to notice. I think this is also one of the reasons why I added the ball interaction.

Sometimes it's possible for the lines to run in places that make them unpredictable, so I've added a function button to reset the starting point of the line.
```Javascript
 clearButton = createButton('Clear');
  clearButton.position(20, 20); 
  clearButton.mousePressed(clearCanvas);

  clearButton.hide();

function clearCanvas() {
  background(255); 
  linePosition = createVector(width / 2, height / 2); 
  previousPosition = linePosition.copy(); 
  }
  ```
#### My final code:
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
![image](https://github.com/user-attachments/assets/14322904-c081-4c15-9c0f-e67ccad760cd)

##### Conclusion
