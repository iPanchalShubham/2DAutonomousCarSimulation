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
    Math.abs([]);       // 0
    Math.abs([2]);      // 2
    Math.abs([1,2]);    // NaN
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
        // 0.03491Rad × 180/π = 2Deg
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        // 0.03491Rad × 180/π = 2Deg
        this.angle -= 0.03 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }
  draw(ctx) {
    ctx.save();
    // It is possible to apply translation to everything that is drawn on a canvas. Translation means relocation of what is drawn.
    ctx.translate(this.x, this.y);
    // As in the case of our canvas our zero lies upwards (i.e remember the unit circle) that why -ve (As you will be needed to flip signs of all angels).
    ctx.rotate(-this.angle);
    //  beginPath() method begins a path, or resets the current path.
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    ctx.restore();
  }
}
