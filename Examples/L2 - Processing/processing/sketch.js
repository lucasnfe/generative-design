let value = 0;

function draw() {
  fill(value);
  rect(0, 0, 50, 50);

}

function mousePressed() {
  value = 255;
}

function keyPressed() {
    if(key == "a") {
        value = 0;
    }
}
