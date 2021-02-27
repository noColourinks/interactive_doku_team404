let sketch = new p5();

let emolga;
let manicanWalk;
let carDriving;
let carStanding;
let trafficLight;
let backgroundSpeedMinigame;
var gameScale = { width: 1000, height: 500 };

function preload() {
  console.log("preload");

  emolga = loadImage("./img/Emolga.png");
  manicanWalk = loadImage("./img/manicanWalk.png");
  carDriving = loadImage("./img/AutoFahrend_2.png");
  carStanding = loadImage("./img/Auto_ohne_Abgase.png");
  trafficLight = loadImage("./img/Ampel.png");
  backgroundSpeedMinigame = loadImage("./img/Hintergrund_Speed_Minispiel.png");
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
};

window.setup = setup;
