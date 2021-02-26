let sketch = new p5();

let emolga;
let manicanWalk;
let carDriving;
var gameScale = { width: 1000, height: 500 };

function preload() {
  console.log("preload");

  emolga = loadImage("./img/Emolga.png");
  manicanWalk = loadImage("./img/manicanWalk.png");
  carDriving = loadImage("./img/AutoFahrend_2.png");
}
window.preload = preload;

function setup() {
  console.log("setup");
  sketch.createCanvas(gameScale.width, gameScale.height);
  sketch.frameRate(30);
}

export { emolga, manicanWalk, carDriving };

window.setup = setup;
