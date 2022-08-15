// A helpful resource https://ucfcdl.github.io/html5-tutorial/.
class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // Speed function
    this.speed = 0;
    this.accelaration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;
    this.controls = new Controls();
  }
  update() {
    this.#move();
  }
  #move() {
    if (this.controls.forward) {
      this.speed += this.accelaration;
      if (this.speed > this.maxSpeed) {
        this.speed = this.maxSpeed;
      }
    }
    if (this.controls.reverse) {
      this.speed -= this.accelaration;
      if (this.speed < -this.maxSpeed) {
        this.speed = -this.maxSpeed;
      }
    }
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    /*
    Math.abs('-1');     // 1
    Math.abs(-2);       // 2
    Math.abs(null);     // 0
    Math.abs('');       // 0
    */
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }
    // If our car is not moving forward or backward (i.e speed == 0) then we will not increase the angle, so that our car should not rotate inplace.
    if (this.speed != 0) {
      //  w.r.t the cartisian plane,if we're going forward (i.e speed -> +ve then y -> -ve and vice versa) or reverse, we're flipping the angle when we're going backwards.
      const flip = this.speed > 0 ? 1 : -1;
      // Whenever the user clicks left or the right key, the angle get increased by 2° everytime.
      if (this.controls.left) {
        //because 0.03491Rad × 180/π = 2Deg
        this.angle += 0.03 * flip;
        // or
        // this.angle += (2 * Math.PI / 180)* flip;
      }
      if (this.controls.right) {
        //because 0.03491Rad × 180/π = 2Deg
        this.angle -= 0.03 * flip;
        // or
        // this.angle -= (2 * Math.PI / 180)* flip;
      }
    }
    // Because the car is moving at an angle, the rates at which x and y increment are different. We calculate these differences using the SINE and COSINE functions in JavaScript.

    // A helpfull image LINK: https://www.mathsisfun.com/algebra/images/sine-cosine-graph.svg

    // PS: Its feels so facinating that how sine and cosine function's curve depicts the real life motion ( i.e going in a straight line, lets say along x axis then according to the unit circle sin(x) will be 1 and cos(x) will be 0, similar to this going in linear fashion 45° from x-axis you're travelling diagonally ). 
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }
  draw(ctx) {
    // Save the current state of our context and then center it to the object to rotate.
    ctx.save();
    // It is possible to apply translation to everything that is drawn on a canvas. Translation means relocation of what is drawn.
    ctx.translate(this.x, this.y);
    // As in the case of our canvas our zero lies upwards (i.e remember the unit circle) that why -ve (As you will be needed to flip signs of all angels).
    ctx.rotate(-this.angle);
    //  beginPath() method begins a path, or resets the current path.
    ctx.beginPath();
    // Draw the image, but subtract half of the width and half of the height from the coordinates. This makes up for the fact that we are rotating around the corner of our object.
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    // Restore the previous context state so that it is not centered around our object.
    ctx.restore();
    // The translate method will now take the place of drawing the image at x and y.
  }
}
