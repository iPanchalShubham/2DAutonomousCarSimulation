let canvas = document.getElementById("myCanvas");
canvas.width = 200;

// To draw on the canvas, we need to have the refrence to the canvas;
// As this contain all the method, which'll help us to draw on this canvas.
const ctx = canvas.getContext("2d");
// Drawing road on canvas
const road = new Road(canvas.width / 2, canvas.width * 0.9);
// Drawing car on canvas
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

// Animate
animate();
function animate() {
  car.update();
  //   When we're adjusting height again and again that means that we're removing the old canvas and a new canvas is being added.
  canvas.height = window.innerHeight;

  ctx.save();
  //Every time our car moves -> the value of y changes thus we're translating the whole canvas every time our car moves 
  ctx.translate(0, -car.y + canvas.height * 0.7);
  
  road.draw(ctx);
  car.draw(ctx);
  ctx.restore();
  
  // request animation function calls its argument (which have to a function) so, many times that it creates a  illusion of movement.
  requestAnimationFrame(animate);
}
