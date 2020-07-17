/* global p5 */

// DO NOT EDIT THE FOLLOWING LINE
const p = new p5 (() => {});

let dots = [];

p.setup = function () {
  p.createCanvas(p.windowWidth - 20, p.windowHeight - 20);
  p.colorMode(p.HSL, 360, 100, 100);

  for (let i = 0; i < 10; i++) {
    //create 42 dots
    let newDot = new BouncyDot()
    dots.push(newDot);
  }

}

p.draw = function () {
  p.background(220, 0, 80);
  for (let d of dots) {
    if (d == undefined) {
      continue;
  } else {
    //float and display each dot in dots
    d.float();
    d.display();
  }
 // mouseClicked();
}
}

p.mouseClicked = function() {
  console.log("HEY");
  for (let i = 0; i < dots.length; i++) {
    let d = dots[i];
    if (p.collidePointCircle(p.mouseX, p.mouseY, d.x, d.y, d.r * 2)) {
      dots.splice(i, 1);
    }
  }

  // for (let d of dots) {
  //   if (p.collidePointCircle(p.mouseX, p.mouseY, d.x, d.y, d.r)) {
  //     console.log("Collided")
  //     dots.pop(d);
  //   }
  // }
}

class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = p.random(p.width);
    this.y = p.random(p.height);
    // Randomly generate radius
    this.r = p.random(20, 30); //magic numbers!
    // Randomly generate color
    this.color = p.random(360);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = p.random(0.5, 10);
    this.masterYvelocity = p.random(0.5, 3);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.r > p.width) {
      this.xVelocity = -1 * this.masterXvelocity;
      this.color = p.random(360);
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
      this.color = p.random(360);
    }
    if (this.y + this.r > p.height) {
      this.yVelocity = -1 * this.masterYvelocity;
      this.color = p.random(360);
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity;
      this.color = p.random(360);
    }
  }

  display() {
    p.fill(this.color, 80, 70);
    p.noStroke();
    p.ellipse(this.x, this.y, this.r * 2);
  }
}
