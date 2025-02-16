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
