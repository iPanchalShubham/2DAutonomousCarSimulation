class Road {
  constructor(x, width, lanecount = 3) {
    this.x = x;
    this.width = width;
    this.lanecount = lanecount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;
  }
  getLaneCenter(laneIndex){
    const laneWidth = this.width/this.lanecount;
    // This part => this.left+laneWidth/2 says => (gives x coordinate's value of the 1st lane's line (i.e that first left white line) position)/2 => middle of the first lane.   
    return this.left+laneWidth/2+laneIndex*laneWidth;

  }
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
    for (let i = 0; i <= this.lanecount; i++) {
      const x = lerp(this.left, this.right, i / this.lanecount);
      if (i > 0 && i < this.lanecount) {
        // About method context2d.setLineDash(arg)
        // arg: An Array of numbers that specify distances to alternately draw a line and a gap (in coordinate space units).
        ctx.setLineDash([20, 20]);
      } else {
        ctx.setLineDash([]);
      }
      // Begin a path, move to position x,this.top. Create a line to position x,this.bottom:
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
  }
}
function lerp(A, B, T) {
  return A + (B - A) * T;
}
