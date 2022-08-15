class Road {
  constructor(x, width, lanecount = 3) {
    // x is the mid point of the canvas in terms of the width if the canvas (i.e canvas.width = 200;).
    this.x = x;
    this.width = width;

    this.lanecount = lanecount;

    this.left = x - width / 2;
    this.right = x + width / 2;
    // To get the infinite track effect using a very large number.
    // PS: using Infinity (inbuilt infinity in javascript) our track goes weirdo.
    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }
  // Getting the center of the laneIndex th ( number ) lane.
  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.lanecount;
    // This part => this.left+laneWidth/2 says => (gives x coordinate's value of the 1st lane's line (i.e that first left white line) position)/2 => middle of the first lane.
    return this.left + laneWidth / 2 + laneIndex * laneWidth;
  }
  // Drawing lines and lanes on the track to give the track look of a road.
  draw(ctx) {
    // Left line
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.left, this.top);
    ctx.lineTo(this.left, this.bottom);
    ctx.stroke();

    // Right line
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.right, this.top);
    ctx.lineTo(this.right, this.bottom);
    ctx.stroke();

    // Drawing lanes
    for (let i = 1; i <= this.lanecount - 1; i++) {
      const x = lerp(this.left, this.right, i / this.lanecount);

      // About method context2d.setLineDash(arg)
      // arg: An Array of numbers that specify distances to alternately draw a line and a gap (in coordinate space units).
      ctx.setLineDash([20, 20]);

      // Begin a path, move to position x,this.top. Create a line to position x,this.bottom:
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    });
  }
}
