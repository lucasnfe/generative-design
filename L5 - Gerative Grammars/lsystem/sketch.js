let lsystem;

function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(3);

    // Lsystem attributes
    let axiom = "F";
    let rules = {"F": "FF-[-F+F]+[+F-F]"};

    lsystem = new LSystem(rules);
    let s = lsystem.expand(axiom, 5);
    lsystem.drawString(s, 25);
}

function draw() {

}
