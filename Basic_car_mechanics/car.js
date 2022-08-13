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
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle -= 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle += 0.03 * flip;
      }
    }
    this.x += Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    ctx.restore();
  }
}
