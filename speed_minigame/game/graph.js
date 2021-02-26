import DisplayObject from "../src/displayObject.js";
import InteractiveObject from "../src/interactiveObject.js";

export default class Graph extends DisplayObject {
  constructor(x, y, width, height, valueObject, valueKey) {
    super(x, y);
    this.setSize(width, height);
    this.valueObject = valueObject;
    this.valueKey = valueKey;
    this.points = [];
    this.time = 0;
    this.measure = false;
  }
  init() {}

  draw() {
    stroke(0);
    stroke(2);
    console.log("hi");
    line(0, 0, 0, this.size.h);
    line(0, this.size.h, this.size.w, this.size.h);
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
        y: this.size.h - this.valueObject[this.valueKey].x * 15,
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
