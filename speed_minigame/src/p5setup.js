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
  emolga = loadImage("./speed_minigame/img/Emolga.png");
  manicanWalk = loadImage("./speed_minigame/img/manicanWalk.png");
  carDriving = loadImage("./speed_minigame/img/AutoFahrend_2.png");
  carStanding = loadImage("./speed_minigame/img/Auto-ohne-Abgase.png");
  trafficLight = loadImage("./speed_minigame/img/Ampel.png");
  backgroundSpeedMinigame = loadImage(
    "./speed_minigame/img/Hintergrund_Speed_Minispiel.png"
  );
  carBrake = loadImage("./speed_minigame/img/Auto-bremst.png");
  comfortaa = loadFont("./speed_minigame/fonts/Comfortaa-Bold.ttf");
  high = loadImage("./speed_minigame/img/high.png");
  low = loadImage("./speed_minigame/img/low.png");
}
window.preload = preload;

function setup() {
  console.log("setup");
  let canvas = sketch.createCanvas(gameScale.width, gameScale.height);
  canvas.parent("speed_game");
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
