class Sensor {
  // Sensor class will use the information ( i.e where the car is on the cartesian plane) based on that information we'll update the sensors.
  constructor(car) {
    this.car = car;
    // No. of rays our sensor would cast.
    this.rayCount = 8;
    // Range of the sensors basically.
    this.rayLength = 100;
    // The angle between the rays.
    this.raySpread = Math.PI / 4;
    // This is going to hold each individual ray.
    this.rays = [];
  }
  update() {
    this.#castRays();
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      // Angle of each individual array.
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,

          this.rayCount > 1 ? i / (this.rayCount - 1) : 0.5
        ) + this.car.angle;

      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.sin(Math.PI / 2 - rayAngle) * this.rayLength,
      };
      this.rays.push([start, end]);
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      // let end=this.rays[i][1];
      // if(this.readings[i]){
      //     end=this.readings[i];
      // }

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.stroke();

      // ctx.beginPath();
      // ctx.lineWidth=2;
      // ctx.strokeStyle="black";
      // ctx.moveTo(
      //     this.rays[i][1].x,
      //     this.rays[i][1].y
      // );
      // ctx.lineTo(
      //     end.x,
      //     end.y
      // );
      // ctx.stroke();
    }
  }
}
