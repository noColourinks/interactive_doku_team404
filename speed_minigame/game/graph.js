import DisplayObject from "../src/displayObject.js";
import InteractiveObject from "../src/interactiveObject.js";

export default class Graph extends DisplayObject {
  constructor(x, y, width, height, valueObject, valueKey, textY, textX) {
    super(x, y);
    this.setSize(width, height);
    this.valueObject = valueObject;
    this.valueKey = valueKey;
    this.points = [];
    this.time = 0;
    this.measure = false;
    this.textY = textY;
    this.textX = textX;
  }
  init() {}

  draw() {
    stroke(0);
    strokeWeight(3);
    console.log("hi");
    line(0, 0, 0, this.size.h);
    line(0, this.size.h, this.size.w, this.size.h);
    strokeWeight(2);
    // noStroke();
    if (this.points.length > 1) {
      for (let i = 1; i < this.points.length; i++) {
        stroke("red");
        line(
          this.points[i - 1].x,
          this.points[i - 1].y,
          this.points[i].x,
          this.points[i].y
        );
      }
      noStroke();
      fill(255);
      text(this.textY, -this.textY.length * 7, 20);
      text(this.textX, this.size.w - this.textX.length * 7, this.size.h + 20);

      //   this.points.forEach((point, index) => {
      //     stroke("red");
      //     line(point.x, point.y, 3);
      //   });
    }
  }

  update() {
    this.time += 2;
    if (this.time < this.size.w) {
      this.points.push({
        x: this.time,
        y: this.size.h - this.valueObject["speed"].x * 20,
      });
    }
  }

  start() {
    this.measure = true;
  }
  stop() {
    this.measure = false;
  }
}
