
class Terrain {
    constructor(initX, initY, length, step, amplitute) {
        this.points = [];
        this.angles = [];
        this.step   = step;
        this.length = length;
        this.thickness = 10;

        this.x = initX;
        this.y = initY;

        for(let i = 0; i <= length; i++) {
            let x = initX + i * step;
            let y = initY + noise(x) * amplitute;

            if(i % 10 == 0 & amplitute < 100) {
                amplitute *= 4;
            }

            this.points.push(createVector(x, y));
        }

        for(let i = 0; i < length; i++) {
            let angle = this.angleBetweenPlatforms(this.points[i], this.points[i+1]);
            this.angles.push(angle);
        }

        this.createBody(step, this.thickness);
    }

    angleBetweenPlatforms(p1, p2) {
        let v1 = createVector(p2.x - p1.x, p2.y - p1.y);
        return atan2(v1.y, v1.x);
    }

    createBody(w, h) {
        let x = this.x;
        let y = this.y;

        for(let i = 0; i < this.angles.length; i++) {
            // Define a body
            let bd = new box2d.b2BodyDef();
            bd.type = box2d.b2BodyType.b2_staticBody;
            bd.position = scaleToWorld(x, y);
            bd.angle = this.angles[i];

            let fd = new box2d.b2FixtureDef();
            fd.shape = new box2d.b2PolygonShape();
            fd.shape.SetAsBox(scaleToWorld(w/2), scaleToWorld(h/2));

            // Create the body
            let body = world.CreateBody(bd);

            // Attach the fixture
            let fix = body.CreateFixture(fd);
            fix.m_filter.categoryBits = CATEGORY_TERRAIN;

            x += cos(this.angles[i]) * this.step/2;
            x += cos(this.angles[i+1]) * this.step/2;

            y += sin(this.angles[i]) * this.step/2;
            y += sin(this.angles[i+1]) * this.step/2;
        }
    }

    draw() {

        fill(81);
        let x = this.x;
        let y = this.y;

        for(let i = 0; i < this.angles.length; i++) {
            push();

            translate(x, y);
            rotate(this.angles[i]);
            translate(-x, -y);

            rectMode(CENTER);
            rect(x, y, this.step, this.thickness);

            pop();

            x += cos(this.angles[i]) * this.step/2;
            x += cos(this.angles[i+1]) * this.step/2;

            y += sin(this.angles[i]) * this.step/2;
            y += sin(this.angles[i+1]) * this.step/2;
        }
    }
}
