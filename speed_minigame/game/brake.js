import AnimationFunctions from "../AnimationFunctions.js";
import AnimationObject from "../src/animationObject.js";
import { brake } from "../src/p5setup.js";

export default class Brake extends AnimationObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.addImage(brake, "brake", width, height);
    this.switchImage("brake");
    this.setCostumAnimation(
      "brake",
      this.triggerIds.mousePressed,
      this.triggerIds.mouseReleased,
      0.3,
      (value) => {
        this.setOffset("scale", this.size.w / 2, 0);
        this.scale.x = 1 - 0.1 * AnimationFunctions.easeOutQuad(value);
        this.scale.y = 1 - 0.1 * AnimationFunctions.easeOutQuad(value);
      },
      { active: true, resetAfterFinish: true }
    );
  }
  init() {
    window.addEventListener("brakeIsDown", () => {
      this.stopAllAnimations();
      this.startAnimation("brake");
    });
    window.addEventListener("brakeUp", () => {
      this.stopAllAnimations();
    });
  }
  mousePressed() {
    window.dispatchEvent(new CustomEvent("brakePressed"));
  }
  mouseReleased() {
    window.dispatchEvent(new CustomEvent("brakeReleased"));
  }
}
