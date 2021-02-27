import InteractiveObject from "../src/interactiveObject.js";
import Car from "./car.js";
import Graph from "./graph.js";
import World from "./world.js";

let started = false;
let car;
let world;
let speedGraph;

function draw() {
  if (!started) {
    started = true;
    car = new Car(0, 33.5, 393.73, 231.92);
    speedGraph = new Graph(100, 250, 600, 200, car, "brakeTime");
    world = new World(0, 0, width, height);

    world.addChild(car);
    world.addChild(speedGraph);
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
