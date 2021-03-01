import DisplayObject from "../src/displayObject.js";
import InteractiveObject from "../src/interactiveObject.js";
import Car from "./car.js";
import Graph from "./graph.js";
import World from "./world.js";
import { trafficLight, comfortaa } from "../src/p5setup.js";

let started = false;
let car;
let world;
let speedGraph;
let trafficLightObj;
let state;

window.addEventListener("restart", () => {
  restart();
});

function draw() {
  if (!started) {
    started = true;
    restart();
  }
  world.onUpdate();
  world.display();
  if (state === "start") {
    push();
    noStroke();
    fill(50, 50, 50, 160);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER);
    textSize(25);
    textFont(comfortaa);
    textLeading(52);
    text(
      "Starte das Spiel mit B.\nBremse mit B.",
      width / 2 - 250,
      height / 2 - 25,
      500,
      100
    );
    pop();
  }
}

function switchState(newState) {
  state = newState;
  switch (state) {
    case "start":
      world.disable();
      break;
    case "game":
      world.enable();
      break;
  }
}

function restart() {
  car = new Car(0, 70, 393.73, 231.92);
  speedGraph = new Graph(
    width / 2 - 200,
    265,
    400,
    200,
    car,
    "brakeTime",
    "Geschwindigkeit",
    "Zeit"
  );
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
  switchState("start");
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
  if (keyCode === 66) {
    switchState("game");
  }
  if (world instanceof InteractiveObject) {
    world.onKeyReleased();
  }
}
window.keyReleased = keyReleased;
