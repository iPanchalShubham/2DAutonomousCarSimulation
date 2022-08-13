let canvas = document.getElementById("myCanvas");
canvas.width = 200;

// To draw on the canvas, we need to have the refrence to the canvas;
// As this contain all the method, which'll help us to draw on this canvas.
const ctx = canvas.getContext("2d");

// Drawing car on canvas
const car = new Car(100, 100, 30, 50);

// Animate
animate();
function animate() {
  car.update();
  //   When we're adjusting height again and again that means that we're removing the old canvas and a new canvas is being added.
  canvas.height = window.innerHeight;
  car.draw(ctx);
  // request animation function calls its argument (which have to a function) so, many times that it creates a  illusion of movement.
  requestAnimationFrame(animate);
}
