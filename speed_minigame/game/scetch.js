import DisplayObject from "../src/displayObject.js";
import InteractiveObject from "../src/interactiveObject.js";
import Car from "./car.js";
import Graph from "./graph.js";
import World from "./world.js";
import { trafficLight } from "../src/p5setup.js";

let started = false;
let car;
let world;
let speedGraph;
let trafficLightObj;

function draw() {
  if (!started) {
    started = true;
    car = new Car(0, 70, 393.73, 231.92);
    speedGraph = new Graph(width / 2 - 300, 265, 600, 200, car, "brakeTime");
    world = new World(0, 0, width, height);
    trafficLightObj = new DisplayObject(800, 40);
    trafficLightObj.addImage(
      trafficLight,
      "trafficLight",
      188 / 3,
      614 / 3,
      0,
      0
    );
    trafficLightObj.switchImage("trafficLight");
    world.addChild(car);
    world.addChild(speedGraph);
    world.addChild(trafficLightObj);
    world.onInit();
  }
  world.onUpdate();
  world.display();
}

window.draw = draw;

function mouseClicked() {
  if (world instanceof InteractiveObject) {
    world.onMouseClick();
  }
}
window.mouseClicked = mouseClicked;

function mousePressed() {
  if (world instanceof InteractiveObject) {
    world.onMousePress();
  }
}
window.mousePressed = mousePressed;

function mouseReleased() {
  if (world instanceof InteractiveObject) {
    world.onMouseRelease();
  }
}
window.mouseReleased = mouseReleased;

function keyPressed() {
  if (world instanceof InteractiveObject) {
    world.onKeyPressed();
  }
}
window.keyPressed = keyPressed;

function keyReleased() {
  if (world instanceof InteractiveObject) {
    world.onKeyReleased();
  }
}
window.keyReleased = keyReleased;
