import DisplayObject from "./displayObject.js";

export default class InteractiveObject extends DisplayObject {
  constructor(x, y, width, height) {
    super(x, y);
    this.setSize(width, height);
    this.moueHovering = false;
    this.waitValues = { start: 0, end: 0 };
    this.timer = {};
  }

  getTimerProgress(id) {
    if (!this.timer.hasOwnProperty(id)) {
      console.error("the Timer must be running: " + id);
      return false;
    }
    let timerNow = this.timer[id];
    let tNow = Date.now();
    let deltaTime = timerNow.end - timerNow.start;
    let deltaTNow = tNow - timerNow.start;
    let result = (1 / deltaTime) * deltaTNow;
    return result > 1 ? 1 : result;
  }

  isTimerFinished(id, deleteTimer = false) {
    if (!this.timer.hasOwnProperty(id)) {
      return false;
    }
    if (this.timer[id].end < Date.now()) {
      if (deleteTimer) delete this.timer[id];
      return true;
    }
    return false;
  }

  deleteTimer(id) {
    if (!this.timer.hasOwnProperty(id)) {
      return false;
    }
    delete this.timer[id];
  }

  setTimer(id, duration) {
    const timeNow = Date.now();
    this.timer[id] = { start: timeNow, end: timeNow + duration * 1000 };
  }

  wait(sek) {
    const timeNow = Date.now();
    this.waitValues.start = timeNow;
    this.waitValues.end = timeNow + sek * 1000;
    this.disable();
  }

  waiting() {
    if (this.waitValues.end < Date.now()) {
      this.enable();
      this.waitValues.start = 0;
    }
  }

  onUpdate() {
    if (this.waitValues.start) {
      this.waiting();
    }
    if (this.isActive) {
      this.onMouseHover();
    }
    super.onUpdate();
  }

  hit(x, y) {
    const realPos = this.getRealXY();
    if (
      x > realPos.x &&
      x < realPos.x + this.size.w * this.parentScale &&
      y > realPos.y &&
      y < realPos.y + this.size.h * this.parentScale
    ) {
      return true;
    }
    return false;
  }

  onMouseHover() {
    if (this.isActive) {
      const value = this.hit(mouseX, mouseY);
      if (this.mouseHovering && value === false) {
        this.onHoverEnd();
        this.mouseHovering = false;
      } else {
        this.mouseHovering = value;
        if (this.mouseHovering) {
          this.mouseHover();
        }
      }
    }
  }

  onHoverEnd() {
    this.hoverEnd();
  }

  hoverEnd() {}

  mouseHover() {}

  onKeyPressed() {
    if (this.isActive) {
      this.children.forEach((child) => {
        if (child instanceof InteractiveObject) {
          child.onKeyPressed();
        }
      });
      this.keyPressed();
    }
  }

  keyPressed() {
    console.log("hey Taste: " + keyCode);
  }

  onKeyReleased() {
    if (this.isActive) {
      this.children.forEach((child) => {
        if (child instanceof InteractiveObject) {
          child.onKeyReleased();
        }
      });
      this.keyReleased();
    }
  }

  keyReleased() {
    console.log("hey Taste: " + keyCode + " released!");
  }

  onMouseClick() {
    if (this.isActive) {
      if (this.hit(mouseX, mouseY)) {
        this.children.forEach((child) => {
          if (child instanceof InteractiveObject) {
            child.onMouseClick();
          }
        });
        this._mouseClicked();
        this.mouseClicked();
      }
    }
  }

  _mouseClicked() {}

  mouseClicked() {}

  onMouseRelease() {
    if (this.isActive) {
      if (this.hit(mouseX, mouseY)) {
        this.children.forEach((child) => {
          if (child instanceof InteractiveObject) {
            child.onMouseRelease();
          }
        });
        this._mouseReleased();
        this.mouseReleased();
      }
    }
  }
  _mouseReleased() {}

  mouseReleased() {}

  onMousePress() {
    if (this.isActive) {
      if (this.hit(mouseX, mouseY)) {
        this.children.forEach((child) => {
          if (child instanceof InteractiveObject) {
            child.onMousePress();
          }
        });
        this._mousePressed();
        this.mousePressed();
      }
    }
  }
  _mousePressed() {}

  mousePressed() {}

  getRealXY() {
    let resultX = this.pos.x;
    let resultY = this.pos.y;
    let p = this.parent;
    while (p) {
      resultX += p.pos.x;
      resultY += p.pos.y;
      p = p.parent;
    }
    return { x: resultX, y: resultY };
  }
}
