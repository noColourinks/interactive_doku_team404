let sketch = new p5();

let emolga;
let manicanWalk;
let carDriving;
let carBrake;
let carStanding;
let trafficLight;
let backgroundSpeedMinigame;
let comfortaa;
let high;
let low;
var gameScale = { width: 1000, height: 500 };

function preload() {
  console.log("preload");
  emolga = loadImage("./img/Emolga.png");
  manicanWalk = loadImage("./img/manicanWalk.png");
  carDriving = loadImage("./img/AutoFahrend_2.png");
  carStanding = loadImage("./img/Auto-ohne-Abgase.png");
  trafficLight = loadImage("./img/Ampel.png");
  backgroundSpeedMinigame = loadImage("./img/Hintergrund_Speed_Minispiel.png");
  carBrake = loadImage("./img/Auto-bremst.png");
  comfortaa = loadFont("./fonts/Comfortaa-Bold.ttf");
  high = loadImage("./img/high.png");
  low = loadImage("./img/low.png");
}
window.preload = preload;

function setup() {
  console.log("setup");
  sketch.createCanvas(gameScale.width, gameScale.height);
  sketch.frameRate(30);
}

export {
  emolga,
  manicanWalk,
  carDriving,
  trafficLight,
  backgroundSpeedMinigame,
  carStanding,
  carBrake,
  comfortaa,
  high,
  low,
};

window.setup = setup;
