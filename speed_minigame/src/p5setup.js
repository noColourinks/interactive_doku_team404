let sketch = new p5();

let emolga;
let manicanWalk;
function preload() {
  console.log("preload");

  emolga = loadImage("./img/Emolga.png");
  manicanWalk = loadImage("./img/manicanWalk.png");
}
window.preload = preload;

function setup() {
  console.log("setup");
  sketch.createCanvas(2000, 2000);
  sketch.frameRate(30);
}

export { emolga, manicanWalk };

window.setup = setup;
