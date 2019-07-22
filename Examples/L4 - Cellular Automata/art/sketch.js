
function setup() {
    createCanvas(400, 400);
    strokeWeight(0);
    frameRate(1);

    w = 1;
    artCA = new ArtCA(width/w, height/w, 14);
}

function draw() {
    artCA.draw(w);
    artCA.generate();
}
