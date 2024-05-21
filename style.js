let x1, x2, y2, x3, y3, x4;
let p1, p2, py2, p3, py3, p4;
let rotationSpeed = 0.01;

function setup() {
  createCanvas(600, 600, WEBGL);

  // Create a button to recreate the picture
  let button = createButton('Recreate Picture');
  button.mousePressed(() => {
    clear();
    redraw();
  });
  button.position(400, 19);

  // Create a button to save the picture
  let saveButton = createButton('Save Picture');
  saveButton.mousePressed(() => saveCanvas('myCanvas', 'jpg'));
  saveButton.position(550, 19);

  noLoop(); // Only draw once initially
}

function draw() {
  clear();
  background(255);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  let petals = floor(random(10, 30));
  let layers = random(5, 25);
  let ang = 360 / petals;

  // Apply the rotation transformation to the entire canvas
  rotateX(rotationSpeed * frameCount);
  rotateY(rotationSpeed * frameCount);
  rotateZ(rotationSpeed * frameCount);

  for (let j = layers; j > 0; j--) {
    push(); // Save the current transformation state for each layer

    let ly = j / layers;
    x1 = random(185 * ly, 205 * ly);
    x4 = random(230 * ly, 245 * ly);
    x2 = random(190 * ly, 215 * ly);
    let maxX2 = x2 * tan(ang) * 0.9;
    y2 = random(15 * ly, maxX2 * ly);
    x3 = random(210 * ly, 230 * ly);
    y3 = random(15 * ly, maxX2);

    p1 = x1;
    p4 = x4;
    p2 = x2;
    py2 = y2;
    p3 = x3;
    py3 = y3;

    let hue = random(256);
    let sat = random(70, 100);
    let brt = random(70, 100);
    let alph = random(40, 100);
    fill(hue, sat, brt, alph);

    for (let i = 0; i < petals; i++) {
      stroke(0);
      strokeWeight(1);
      beginShape();
      curveVertex(x1, 0);
      curveVertex(x1, 0);
      curveVertex(x2, y2);
      curveVertex(x3, y3);
      curveVertex(x4, 0);
      curveVertex(x4, 0);
      curveVertex(p1, 0);
      curveVertex(p1, 0);
      curveVertex(p2, -py2);
      curveVertex(p3, -py3);
      curveVertex(p4, 0);
      curveVertex(p4, 0);
      endShape();
      rotateZ(ang); // Rotate around the Z-axis for each petal
    }

    pop(); // Restore the previous transformation state for each layer

    rotateX(ang); // Random rotation around X-axis
    rotateY(random(-90, 90)); // Random rotation around Y-axis
  }

  noLoop(); // Stop the draw loop
}
