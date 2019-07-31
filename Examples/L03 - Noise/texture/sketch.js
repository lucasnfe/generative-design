function setup() {
  createCanvas(500, 500);
  colorMode(HSL);
   // noStroke();
   noLoop();

  var size = 3;

	for(var i = 0; i < width; i++) {
		for(var j = 0; j < height; j++) {
			var n = noise(i / 50, j / 50);
			var li = n * 100;
            var hu = n * 60;

            stroke(hu, 100, li);
            point(i, j);
		}
	}
}
