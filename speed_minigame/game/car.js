import AnimationFunctions from "../AnimationFunctions.js";
import AnimationObject from "../src/animationObject.js";
import InteractiveObject from "../src/interactiveObject.js";
import MovingObject from "../src/movingObject.js";
import { emolga, manicanWalk, carDriving } from "../src/p5setup.js";

export default class Car extends AnimationObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.addImage(
      carDriving,
      "carDriving",
      width,
      height,
      0,
      0,
      0,
      0,
      393.73,
      231.92
    );
    this.addAnimationFrames("carDriving", "carDriving", 393.73, 231.92, 3);
    this.switchImage("carDriving");
    this.debug = true;
    this.setLimits(7, 0, 0, 0, 0, 0);
    this.isDriving = true;
    this.setSpeed(7, 0, 0);
    this.setCostumAnimation(
      "carDrivingAnimation",
      this.triggerIds.timed,
      this.triggerIds.timed,
      0.4,
      (value) => {
        this.runAnimationFrame("carDriving", value);
      },
      { active: true, repeate: true, resetAfterFinish: true }
    );
    this.startAnimation("carDrivingAnimation");
    // console.log(this.animations);
    // this.setCostumAnimation(
    //   "manicanWalkRight",
    //   this.triggerIds.keyPressed + ":65",
    //   this.triggerIds.keyReleased + ":65",
    //   0.2,
    //   (value) => {
    //     this.flip(-1, 1);
    //     this.runAnimationFrame("manicanWalk", value);
    //   },
    //   { active: true, repeate: true, resetAfterFinish: true }
    // );
  }

  keyPressed() {}

  update() {
    if (this.isDriving) {
      if (keyIsDown(32)) {
        this.setAcceleration(-0.2, 0, 0);
      } else {
        this.setAcceleration(0.2, 0, 0);
      }
      if (this.getSpeed().x < 0.3 || this.pos.x > width - 100) {
        this.isDriving = false;
        this.stop();
        window.dispatchEvent(
          new CustomEvent("carStopped", {
            detail: { pos: this.pos },
          })
        );
      }
    }
  }

  draw() {}
}
