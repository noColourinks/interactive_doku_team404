import DisplayObject from "./displayObject.js";
import InteractiveObject from "./interactiveObject.js";
import Test from "./test.js";
let started = false;
let test;

function draw() {
  if (!started) {
    started = true;
    test = new Test(200, 200, 100, 100);
    test.onInit();
  }
  background(255);
  test.onUpdate();
  test.display();
}

window.draw = draw;

function mouseClicked() {
  if (test instanceof InteractiveObject) {
    test.onMouseClick();
  }
}
window.mouseClicked = mouseClicked;

function mousePressed() {
  if (test instanceof InteractiveObject) {
    test.onMousePress();
  }
}
window.mousePressed = mousePressed;

function mouseReleased() {
  if (test instanceof InteractiveObject) {
    test.onMouseRelease();
  }
}
window.mouseReleased = mouseReleased;

function keyPressed() {
  if (test instanceof InteractiveObject) {
    test.onKeyPressed();
  }
}
window.keyPressed = keyPressed;

function keyReleased() {
  if (test instanceof InteractiveObject) {
    test.onKeyReleased();
  }
}
window.keyReleased = keyReleased;
