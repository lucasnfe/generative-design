
class Car {
    static angAmount = 8;
    static wheAmount = 2;

    static angRange  = [0, 360];
    static magRange  = [0, 100];
    static radRange  = [10, 60];
    static acceler   = 50;

    constructor(x, y, name, carFeats) {
        this.name = name;
        this.feats = carFeats;

        // Load angles/magnitues and sort them by angle
        let angles = new Array(Car.angAmount);

        for(let i = 0; i < Car.angAmount * 2; i += 2) {
            angles[int(i/2)] = {"ang": carFeats[i], "mag": carFeats[i+1]};
        }
        angles.sort((a, b) => (a.ang > b.ang) ? 1 : -1);

        // Transform angles/magnitues into vectors
        this.vs = [];
        for(let a of angles) {
            let v = createVector(cos(radians(a.ang)) * a.mag, sin(radians(a.ang)) * a.mag);
            this.vs.push(v);
        }

        // Load wheels
        this.ws = new Array(Car.wheAmount);

        for(let i = Car.angAmount * 2; i < Car.angAmount * 2 + Car.wheAmount * 2; i += 2) {
            this.ws[int(i - (Car.angAmount * 2))/2] = {"v": carFeats[i], "r": carFeats[i+1]};
        }

        // Generate car colors
        this.bodyColor = color(random(255), random(255), random(255), 100);

        let c = random(80, 150);
        this.wheelsColor = color(c, c, c, 100);

        this.timeStopped = 0;
        this.createBody(x, y);
    }

    static randomFeatures() {
        let features = new Array(Car.angAmount * 2 + Car.wheAmount * 2);

        for(let i = 0; i < Car.angAmount * 2; i += 2) {
            features[i] = Car.randomAngle();
            features[i+1] = Car.randomMagnitude();
        }

        for(let i = Car.angAmount * 2; i < Car.angAmount * 2 + Car.wheAmount * 2; i += 2) {
            features[i] = Car.randomVertex();
            features[i+1] = Car.randomRadius();
        }

        return features;
    }

    static randomVertex() {
        return int(random(0, Car.angAmount));
    }

    static randomAngle() {
        return random(Car.angRange[0], Car.angRange[1]);
    }

    static randomMagnitude() {
        return random(Car.magRange[0], Car.magRange[1]);
    }

    static randomRadius() {
        return random(Car.radRange[0], Car.radRange[1]);
    }

    createBody(x, y) {
        // Define a body
        let bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position = scaleToWorld(x, y);

        // Create the body
        this.body = world.CreateBody(bd);

        // Define the body fixture
        let fd = new box2d.b2FixtureDef();
        fd.shape = new box2d.b2PolygonShape();

        let vertices = [];
        for(let v of this.vs) {
            vertices.push(scaleToWorld(v.x, v.y));
        }
        fd.shape.Set(vertices, vertices.length);

        // Movement parameters
        fd.density = 0.2;
        fd.friction = 10.0;
        fd.restitution = 0.2;

        // Define wheel fixtures
        for(let w of this.ws) {
            let cs = new box2d.b2FixtureDef();
            cs.shape = new box2d.b2CircleShape();

            cs.shape.m_radius = scaleToWorld(w.r/2);
            cs.shape.m_p.x = scaleToWorld(this.vs[w.v].x);
            cs.shape.m_p.y = scaleToWorld(this.vs[w.v].y);

            cs.density = 0.2;
            cs.friction = 0.0;
            cs.restitution = 0.2;

            let fixW = this.body.CreateFixture(cs);
            fixW.m_filter.categoryBits = CATEGORY_CAR;
            fixW.m_filter.maskBits = COLLISION_MASK_CAR;
        }

        // Attach the fixture with collision masks
        let fixBody = this.body.CreateFixture(fd);
        fixBody.m_filter.categoryBits = CATEGORY_CAR;
        fixBody.m_filter.maskBits = COLLISION_MASK_CAR;
    }

    update() {
        if(this.isColliding(BOX2D_CIRCLE_SHAPE)) {
            let force = new box2d.b2Vec2(Car.acceler, 0);
            this.body.ApplyForce(force, this.body.GetWorldCenter());
        }

        if(abs(this.getVelocity().x) < 0.01) {
            this.timeStopped += deltaTime/1000;
        }
        else {
            this.timeStopped = 0;
        }
    }

    draw() {
        this.update();

        // Get the body's position
        let bodyPos = this.getPosition();

        // Get its angle of rotation
        let a = this.body.GetAngleRadians();

        push();
        translate(bodyPos.x, bodyPos.y);
        rotate(a);

        // Draw body
        beginShape(TRIANGLE_STRIP);
            fill(this.bodyColor);
            for(let v of this.vs) {

                vertex(v.x,v.y);
                vertex(0,0);
            }
        endShape();

        // Draw wheels
        fill(this.wheelsColor);

        for(let w of this.ws) {
            ellipse(this.vs[w.v].x, this.vs[w.v].y, w.r, w.r);
        }

        pop();
    }

    getTimeStopped() {
        return this.timeStopped;
    }

    getVelocity() {
        return scaleToPixels(this.body.m_linearVelocity);
    }

    getPosition() {
        return scaleToPixels(this.body.GetPosition());
    }

    isColliding(colType) {
        if(this.body.m_contactList) {
            let contact = this.body.m_contactList.contact;
            while(contact != null) {
                if(contact.m_fixtureA.m_shape.m_type == colType ||
                   contact.m_fixtureB.m_shape.m_type == colType) {

                    return true;
                }

                contact = contact.m_next;
            }
        }

        return false;
    }
}
