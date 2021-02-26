import InteractiveObject from "./interactiveObject.js";

export default class MovingObject extends InteractiveObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.speed = { x: 0, y: 0, rot: 0 };
    this.acc = { x: 0, y: 0, rot: 0 };
    this.limits = {
      maxX: 1,
      minX: -1,
      maxY: 1,
      minY: -1,
      maxRot: 1,
      minRot: -1,
    };
    this.holded = false;
    this.deAcc = { x: 1, y: 1, rot: 1 };
    this.speedToNull = { x: 0.001, y: 0.001, rot: 0.001 };
  }

  release() {
    this.holded = false;
  }

  hold() {
    this.holded = true;
    this.speed.x = 0;
    this.speed.y = 0;
    this.speed.rot = 0;
    return;
  }

  stop() {
    this.speed.x = 0;
    this.speed.y = 0;
    this.speed.rot = 0;
    this.acc.x = 0;
    this.acc.y = 0;
    this.acc.rot = 0;
  }

  onUpdate() {
    if (this.isActive) {
      this.move();
    }
    super.onUpdate();
  }

  setLimits(maxX, minX, maxY, minY, maxRot, minRot) {
    this.limits.maxX = maxX;
    this.limits.minX = minX;
    this.limits.maxY = maxY;
    this.limits.minY = minY;
    this.limits.maxRot = maxRot;
    this.limits.minRot = minRot;
  }

  setdeAcceleration(x, y, rot) {
    this.deAcc.x = x;
    this.deAcc.y = y;
    this.deAcc.rot = rot;
  }

  setdeAccelerationWithKey(key, value) {
    if (!this.deAcc.hasOwnProperty(key)) {
      return console.error("There is no Deacceleration under the key:" + key);
    }
    this.deAcc.key = value;
  }

  setAcceleration(x, y, rot) {
    this.acc.x = x;
    this.acc.y = y;
    this.acc.rot = rot;
  }

  setSpeed(x, y, rot) {
    this.speed.x = x;
    this.speed.y = y;
    this.speed.rot = rot;
  }

  getSpeed() {
    return this.speed;
  }

  move() {
    if (this.holded) {
      return;
    }
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
    this.rotation += this.speed.rot;

    //Beschleunigung
    this.speed.x = (this.speed.x + this.acc.x) * this.deAcc.x;
    this.speed.y = this.speed.y * this.deAcc.y + this.acc.y;
    this.speed.rot = this.speed.rot * this.deAcc.rot + this.acc.rot;
    if (abs(this.speed.x) < this.speedToNull.x) this.speed.x = 0;
    if (abs(this.speed.y) < this.speedToNull.y) this.speed.y = 0;
    if (abs(this.speed.rot) < this.speedToNull.rot) this.speed.rot = 0;

    //Maximale Beschleunigung
    if (this.speed.x > this.limits.maxX) this.speed.x = this.limits.maxX;
    if (this.speed.y > this.limits.maxY) this.speed.y = this.limits.maxY;
    if (this.speed.rot > this.limits.maxRot)
      this.speed.rot = this.limits.maxRot;
    //Minimale Beschleunigung
    if (this.speed.x < this.limits.minX) this.speed.x = this.limits.minX;
    if (this.speed.y < this.limits.minY) this.speed.y = this.limits.minY;
    if (this.speed.rot < this.limits.minRot)
      this.speed.rot = this.limits.minRot;
  }
}
