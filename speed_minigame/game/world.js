import InteractiveObject from "../src/interactiveObject.js";
import { backgroundSpeedMinigame } from "../src/p5setup.js";

export default class World extends InteractiveObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.sweetSpot = { xLeft: width - 250.73, xRight: width - 200 };
    this.addImage(backgroundSpeedMinigame, "background", width, height, 0, 0);
    this.switchImage("background");
    this.groundHeight = 235;
    this.tolerance = 5;
    this.winText = "";
  }
  init() {
    window.addEventListener("carStopped", (e) => {
      this.checkSweetSpot(e.detail.pos);
    });
  }

  draw() {
    background(255);
    fill(0);
  }
  drawPost() {
    stroke(0);
    strokeWeight(5);
    line(0, this.groundHeight, width, this.groundHeight);
    stroke(255);
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
    if (pos.x + 310 < this.sweetSpot.xRight) {
      this.winText = "Vor der Ampel angehalten :D";
    } else {
      this.winText = "Über Rot gefahren!";
    }
  }
}
