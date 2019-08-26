let lsystem;

function setup() {
    createCanvas(500, 500);
    strokeWeight(3);

    // Lsystem attributes
    let axiom = "F";
    let rules = {"F": "FF-[-F+F]+[+F-F]"};

    lsystem = new LSystem(rules);
    let s = lsystem.expand(axiom, 4);
    lsystem.drawString(s, 25);
}

function draw() {

}
