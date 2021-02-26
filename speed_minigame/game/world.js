import InteractiveObject from "../src/interactiveObject.js";

export default class World extends InteractiveObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.sweetSpot = { xLeft: width - 450.73, xRight: width - 200 };
    this.groundHeight = 200;
    this.tolerance = 5;
    this.winText = "";
  }
  init() {
    window.addEventListener("carStopped", (e) => {
      this.checkSweetSpot(e.detail.pos);
    });
  }

  draw() {
    background(150, 150, 255);
    fill(0);
    stroke(0);
    strokeWeight(5);
    line(0, this.groundHeight, width, this.groundHeight);
    stroke(0, 255, 0);
    strokeWeight(5);
    line(
      this.sweetSpot.xLeft,
      this.groundHeight,
      this.sweetSpot.xRight,
      this.groundHeight
    );
    stroke(0);
    strokeWeight(1);
    textSize(14);
    text(this.winText, 30, 35);
  }

  checkSweetSpot(pos) {
    console.log(pos.x);
    if (pos.x + 100 < this.sweetSpot.xRight) {
      this.winText = "Vor der Ampel angehalten :D";
    } else {
      this.winText = "Über Rot gefahren!";
    }
  }
}
