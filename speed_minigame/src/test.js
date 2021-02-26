import AnimationFunctions from "../AnimationFunctions.js";
import AnimationObject from "../animationObject.js";
import InteractiveObject from "./interactiveObject.js";
import MovingObject from "./movingObject.js";
import { emolga, manicanWalk } from "./p5setup.js";

export default class Test extends AnimationObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.addImage(emolga, "emolga", 120, 100);
    this.addImage(manicanWalk, "manicanWalk", 100, 100, 0, 0, 0, 0, 150, 150);
    this.addAnimationFrames("manicanWalk", "manicanWalk", 150, 150, 3);
    this.switchImage("manicanWalk");
    this.debug = false;
    this.transparency = 0;
    this.setLimits(7, -5, 0, 0, 0, 0);

    this.setCostumAnimation(
      "manicanWalLeftk",
      this.triggerIds.keyPressed + ":68",
      this.triggerIds.keyReleased + ":68",
      0.2,
      (value) => {
        this.flip(1, 1);
        this.runAnimationFrame("manicanWalk", value);
      },
      { active: true, repeate: true, resetAfterFinish: true }
    );
    console.log(this.animations);
    this.setCostumAnimation(
      "manicanWalkRight",
      this.triggerIds.keyPressed + ":65",
      this.triggerIds.keyReleased + ":65",
      0.2,
      (value) => {
        this.flip(-1, 1);
        this.runAnimationFrame("manicanWalk", value);
      },
      { active: true, repeate: true, resetAfterFinish: true }
    );
    console.log(this.animations);
  }

  keyPressed() {}

  update() {
    console.log(this.speed.x);
    this.setAcceleration(0, 0, 0);
    this.setdeAcceleration(0.98, 1, 1);
    if (keyIsDown(68)) {
      this.setAcceleration(0.2, 0, 0);
      this.setdeAcceleration(1, 1, 1);
    }
    if (keyIsDown(65)) {
      this.setAcceleration(-0.2, 0, 0);
      this.setdeAcceleration(1, 1, 1);
    }
  }

  draw() {}
}
