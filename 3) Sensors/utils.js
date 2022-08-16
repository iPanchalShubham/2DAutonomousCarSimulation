// The lerp function gives us the value between A and B ([A,B]) depending on T.
// Basic linear interpolation
function lerp(A, B, T) {
  return A + (B - A) * T;
}
