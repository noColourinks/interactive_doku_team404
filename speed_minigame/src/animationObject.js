import MovingObject from "./movingObject.js";

export default class AnimationObject extends MovingObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.animations = {};
    this.triggerIds = {
      mouseHover: "mouseHover",
      keyPressed: "keyPressed",
      mouseHoverEnd: "mouseHoverEnd",
      keyReleased: "keyReleased",
      timed: "timed",
      anyKeyPressed: "anyKeyPressed",
      anyKeyReleased: "anyKeyReleased",
      mousePressed: "mousePressed",
      mouseClicked: "mouseClicked",
      mouseReleased: "mouseReleased",
    };
    this.animationFrames = {};
    this.runningAnimations = [];
  }

  onUpdate() {
    if (this.isActive) {
      if (this.mouseHovering) {
        this.callTriggerEvent(this.triggerIds.mouseHover);
      }
      this.runAnimations();
    }
    super.onUpdate();
  }

  _mouseClicked() {
    this.callTriggerEvent(this.triggerIds.mouseClicked);
    super._mouseClicked();
  }

  _mouseReleased() {
    this.callTriggerEvent(this.triggerIds.mouseReleased);
    super._mouseReleased();
  }

  _mousePressed() {
    this.callTriggerEvent(this.triggerIds.mousePressed);
    super._mousePressed();
  }

  onKeyPressed() {
    if (this.isActive) {
      this.callTriggerEvent(this.triggerIds.keyPressed + ":" + keyCode);
      this.callTriggerEvent(this.triggerIds.anyKeyPressed);
    }
    super.onKeyPressed();
  }

  onKeyReleased() {
    if (this.isActive) {
      this.callTriggerEvent(this.triggerIds.keyReleased + ":" + keyCode);
      this.callTriggerEvent(this.triggerIds.anyKeyReleased);
    }
    super.onKeyReleased();
  }

  callTriggerEvent(trigger) {
    let startedElements = [];
    this.getAnimationsWithTrigger(trigger, "start").forEach((element) => {
      if (!this.isAnimationRunning(element)) {
        this.startAnimation(element.id);
        startedElements.push(element);
      }
    });
    this.getAnimationsWithTrigger(trigger, "end").forEach((element) => {
      if (
        this.isAnimationRunning(element) &&
        startedElements.indexOf(element) < 0
      )
        this.stopAnimation(element);
    });
  }

  onHoverEnd() {
    this.callTriggerEvent(this.triggerIds.mouseHoverEnd);
    super.onHoverEnd();
  }

  runAnimations() {
    let finishedAnimations = [];
    this.runningAnimations.forEach((animation) => {
      animation.func(this.getTimerProgress(animation.id));
      if (this.isTimerFinished(animation.id)) {
        if (animation.property.repeate) {
          this.deleteTimer(animation.id);
          this.setTimer(animation.id, animation.duration);
        } else if (animation.endTrigger === this.triggerIds.timed) {
          finishedAnimations.push(animation);
        }
      }
    });
    finishedAnimations.forEach((fiAn) => {
      this.stopAnimation(fiAn);
    });
  }

  addAnimationFrames(id, imgKey, frameSizeX, frameSizeY, frameCount) {
    if (this.animationFrames.hasOwnProperty(id)) {
      return console.error(`The id ${id} is used by another animation.`);
    }
    if (!this.images.hasOwnProperty(imgKey)) {
      return console.error(`There need to be an image with the id: ${imgKey}`);
    }
    this.animationFrames[id] = {
      id,
      img: this.getImage(imgKey),
      frameSize: {
        x: frameSizeX,
        y: frameSizeY,
      },
      frameCount,
    };
  }

  runAnimationFrame(id, progress) {
    if (!this.animationFrames.hasOwnProperty(id)) {
      return console.error(`There are no animationFrames with the id: ${id}`);
    }
    let anFrame = this.animationFrames[id];
    if (progress < 1) {
      let frameNow = floor(anFrame.frameCount * progress);
      this.img = {
        img: anFrame.img.img,
        width: anFrame.img.width,
        height: anFrame.img.height,
        xOffset: anFrame.img.xOffset,
        yOffset: anFrame.img.yOffset,
        sx: anFrame.frameSize.x * frameNow,
        sy: anFrame.img.sy,
        sWidth: anFrame.frameSize.x,
        sHeight: anFrame.frameSize.y,
      };
    }
  }

  isAnimationRunning(animation) {
    return this.runningAnimations.indexOf(animation) < 0 ? false : true;
  }

  getAnimationsWithTrigger(trigger, triggerType) {
    let keys = Object.keys(this.animations);
    let result = [];
    keys.forEach((key) => {
      if (this.animations[key][triggerType + "Trigger"] === trigger) {
        result.push(this.animations[key]);
      }
    });
    return result;
  }

  stopAnimation(animation) {
    if (this.runningAnimations.indexOf(animation) < 0) {
      console.error("The animation: " + animation + " is not running.");
      return;
    }
    this.runningAnimations.splice(
      [this.runningAnimations.indexOf(animation)],
      1
    );
    this.deleteTimer(animation.id);
    if (animation.property.resetAfterFinish) {
      animation.func(0);
    }
    if (animation.property.deleteAfterFinish) {
      delete this.animations[animation.id];
    }
  }

  stopAllAnimations() {
    this.runningAnimations.forEach((animation) => {
      this.deleteTimer(animation.id);
      if (animation.property.resetAfterFinish) {
        animation.func(0);
      }
      if (animation.property.deleteAfterFinish) {
        delete this.animations[animation.id];
      }
    });
    this.runningAnimations = [];
  }

  startAnimation(id) {
    if (!this.animations.hasOwnProperty(id)) {
      console.error("There is no animation to start with the id: " + id);
      return;
    }
    let animation = this.animations[id];
    if (!animation.property.active) {
      return;
    }
    this.runningAnimations.push(animation);
    this.setTimer(id, animation.duration);
  }

  setCostumAnimation(
    id,
    startTrigger,
    endTrigger,
    duration,
    func,
    property = {}
  ) {
    if (this.animations.hasOwnProperty(id)) {
      console.error("The id " + id + " is already used.");
      return;
    }
    this.animations[id] = {
      id,
      startTrigger,
      endTrigger,
      duration,
      func,
      property,
    };
    if (!this.triggerIds.hasOwnProperty(startTrigger)) {
      window.addEventListener(startTrigger, () => {
        this.callTriggerEvent(startTrigger);
      });
    }
    if (!this.triggerIds.hasOwnProperty(endTrigger)) {
      window.addEventListener(endTrigger, () => {
        this.callTriggerEvent(endTrigger);
      });
    }
    /*
            resetAfterFinish: 
            active: 
            deleteAfterFinish:
            repeate
        */
  }
}
