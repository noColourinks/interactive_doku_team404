export default class DisplayObject {
  constructor(x, y) {
    this.pos = { x, y };
    this.size = { w: 0, h: 0 };
    this.img;
    this.scale = { x: 1, y: 1 };
    this.parentScale = { x: 1, y: 1 };
    this.rotation = 0;
    //offset.img.x/y gilt für alle Bilder im Vergleich zu dem Indivudellen Offset, welches in der addImage Methode definiert wird.
    this.offset = {
      pos: { x: 0, y: 0 },
      rotation: { x: 0, y: 0 },
      scale: { x: 0, y: 0 },
      img: { x: 0, y: 0 },
    };
    this.images = {};
    this.children = [];
    this.parent;
    this.debug = false;
    this.debugPopertys = { circleSize: 7, rectStrokeSize: 3 };
    this.isActive = true;
  }

  onInit() {
    this.init();
    this.children.forEach((child) => {
      if (child instanceof DisplayObject) {
        child.onInit();
      }
    });
  }

  init() {}

  onUpdate() {
    if (this.isActive) {
      this.update();
      this.children.forEach((child) => {
        if (child instanceof DisplayObject) {
          child.onUpdate();
        }
      });
    }
  }

  update() {}

  addChild(obj) {
    if (!obj) {
      console.error("Pls enter an object.");
      return;
    }
    if (this.children.indexOf(obj) >= 0) {
      console.error("This Object is already in the array.");
      return;
    }
    if (obj instanceof DisplayObject) {
      obj.parent = this;
    }
    obj.updateParentScale();
    this.children.push(obj);
    return true;
  }

  removeChild(obj) {
    if (!obj) {
      console.error("Pls enter an object.");
      return;
    }
    obj.parent = undefined;
    const index = this.children.indexOf(obj);
    if (index < 0) {
      console.error("This Object is not in the array.");
      return;
    }
    this.children.splice(index, 1);
    return true;
  }

  enable() {
    this.isActive = true;
  }

  disable() {
    this.isActive = false;
  }

  setPosition(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  setScaleUpdateHitbox(scaleX, scaleY) {
    if (this.scaleX < 0 || scaleY < 0) {
      console.error("The new Scale must be equal or greater zero");
      return;
    }
    this.scale = { x: scaleX, y: scaleY };
    if (this.size.w && this.size.h) {
      this.size.w *= this.scale.x;
      this.size.h *= this.scale.y;
    }
    this.children.forEach((child) => {
      if (child instanceof DisplayObject) {
        child.updateParentScale();
      }
    });
  }

  flip(scaleX, scaleY) {
    if (scaleX < 0) {
      this.offset.scale.x = (-this.size.w * scaleX) / 2;
    }
    if (scaleY < 0) {
      this.offset.scale.y += (-this.size.h * scaleY) / 2;
    }
    this.scale.x = scaleX;
    this.scale.y = scaleY;
  }

  setOffset(offset, x, y) {
    if (!this.offset.hasOwnProperty(offset)) {
      console.error(
        `The right offset properties are: pos, rotation, scale, img`
      );
      return;
    }
    this.offset[offset].x = x;
    this.offset[offset].y = y;
  }

  setSize(width, height) {
    if (width < 0 || height < 0) {
      console.error(`The width and height must be equal or greater zero.`);
      return;
    }
    this.size.w = width;
    this.size.h = height;
  }

  setRotationInDegree(rot) {
    this.rotation = radians(rot);
  }

  setRotationOffsetToMid() {
    if (!this.size.w || !this.size.h) {
      console.error(
        `You need to define width and height for the object to use setRotationOffsetToMid().`
      );
      return;
    }
    this.offset.rotation.x = this.size.w / 2;
    this.offset.rotation.y = this.size.h / 2;
  }

  updateParentScale() {
    let scale = { x: 1, y: 1 };
    let p = this.parent;

    while (p) {
      scale.x *= p.scale.x;
      scale.y *= p.scale.y;
      p = p.parent;
    }
    this.parentScale = scale;
  }

  addImage(
    img,
    key,
    width = this.size.w,
    height = this.size.h,
    xOffset = 0,
    yOffset = 0,
    sx = 0,
    sy = 0,
    sWidth = 0,
    sHeight = 0
  ) {
    if (!img) {
      console.error("You have to add an image.");
      return false;
    }
    if (!key) {
      console.error("You have to add an key under wich the image is saved.");
      return false;
    }
    if (width < 0 || height < 0) {
      console.error(
        `The width and height of the image must be equal or greater zero. Not width: ${width} height: ${height}`
      );
      return false;
    }
    if (this.images.hasOwnProperty(key)) {
      console.error(`This key: ${key} is already used.`);
      return false;
    }
    this.images[key] = {
      img,
      width,
      height,
      xOffset,
      yOffset,
      sx,
      sy,
      sWidth: sWidth,
      sHeight: sHeight,
    };
    return true;
  }

  switchImage(key) {
    if (!this.images.hasOwnProperty(key)) {
      console.error(`There is no image under his key: ${key}.`);
      return false;
    }
    this.img = this.images[key];
  }

  getImage(key) {
    if (!this.images.hasOwnProperty(key)) {
      console.error(`There is no image under his key: ${key}.`);
      return false;
    }
    return this.images[key];
  }
  draw() {}

  display() {
    push();

    //Festlegung neuer Urspung
    translate(this.pos.x + this.offset.pos.x, this.pos.y + this.offset.pos.y);

    //Rotation des Objektes mit Rotationspunktoffset
    translate(this.offset.rotation.x, this.offset.rotation.y);
    rotate(this.rotation);
    translate(-this.offset.rotation.x, -this.offset.rotation.y);

    //Skallierung des Objektes mit Skallierungspunkoffset
    translate(this.offset.scale.x, this.offset.scale.y);
    scale(this.scale.x, this.scale.y);
    translate(-this.offset.scale.x, -this.offset.scale.y);

    //Zeichnen der p5 Objekte
    push();

    this.draw();
    pop();
    if (this.img) {
      if (this.img.sWidth <= 0 || this.img.sHeight <= 0) {
        image(
          this.img.img,
          this.img.xOffset + this.offset.img.x,
          this.img.yOffset + this.offset.img.y,
          this.img.width,
          this.img.height
        );
      } else {
        image(
          this.img.img,
          this.img.xOffset + this.offset.img.x,
          this.img.yOffset + this.offset.img.y,
          this.img.width,
          this.img.height,
          this.img.sx,
          this.img.sy,
          this.img.sWidth,
          this.img.sHeight
        );
      }
    }

    this.children.forEach((element) => {
      if (element instanceof DisplayObject) {
        element.display();
      }
    });
    pop();
    //Zeichnen der Debug Punkte in der richtigen Reihenfolge
    if (this.debug) {
      this.displayDebug();
      this.children.forEach((element) => {
        if (element instanceof DisplayObject) {
          element.displayDebug();
        }
      });
    }
  }
  displayDebug() {
    push();
    fill(255);
    strokeWeight(1);
    stroke(0);

    translate(this.pos.x + this.offset.pos.x, this.pos.y + this.offset.pos.y);
    //Rotation des Objektes mit Rotationspunktoffset
    translate(this.offset.rotation.x, this.offset.rotation.y);
    rotate(this.rotation);
    fill("red");
    circle(0, 0, this.debugPopertys.circleSize);
    translate(-this.offset.rotation.x, -this.offset.rotation.y);

    //Skallierung des Objektes mit Skallierungspunkoffset
    translate(this.offset.scale.x, this.offset.scale.y);
    scale(this.scale.x, this.scale.y);
    fill("green");
    circle(0, 0, this.debugPopertys.circleSize);
    translate(-this.offset.scale.x, -this.offset.scale.y);

    //Hitbox

    pop();
    push();
    if (this.size.w && this.size.h) {
      translate(this.pos.x, this.pos.y);
      scale(1);
      noFill();
      stroke("#0377fc");
      strokeWeight(this.debugPopertys.rectStrokeSize);
      rect(0, 0, this.size.w, this.size.h);
    }
    pop();
    push();
    translate(this.pos.x, this.pos.y);
    translate(this.offset.rotation.x, this.offset.rotation.y);
    rotate(this.rotation);
    translate(-this.offset.rotation.x, -this.offset.rotation.y);
    translate(this.offset.scale.x, this.offset.scale.y);
    scale(this.scale.x, this.scale.y);
    translate(-this.offset.scale.x, -this.offset.scale.y);
    fill(255);
    //Kreis der pos.x pos.y Koordinaten.
    circle(0, 0, this.debugPopertys.circleSize);
    pop();
  }
}
