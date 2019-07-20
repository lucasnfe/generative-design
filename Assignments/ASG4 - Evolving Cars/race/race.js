let BOX2D_CIRCLE_SHAPE = 0;

let CATEGORY_CAR = 0x0001;
let CATEGORY_TERRAIN = 0x0002;
let COLLISION_MASK_CAR = CATEGORY_TERRAIN;

class Race {
    static maxStoppedTime = 1.5;

    constructor(terrain, cars, raceOver) {
        this.cars = cars;
        this.terrain = terrain;
        this.raceOver = raceOver;
        this.running = false;

        this.start();
    }

    start() {
        this.leaderboards = {};

        for(let i = 0; i < this.cars.length; i++) {
            let name = this.cars[i].name;
            let feats = this.cars[i].feats.slice(0);

            this.leaderboards[name] = {"car": this.cars[i], "progress": 0};
        }

        this.running = true;
        console.log("start!", this.running);
    }

    stop() {
        console.log("stop!");
        this.running = false;
    }

    setCars(cars) {
        this.cars = cars;
    }

    getLeaderboards() {
        let leaderboards = [];

        for(let carName in this.leaderboards) {
            let car = this.leaderboards[carName].car;
            let feats = this.leaderboards[carName].feats;
            let progress = this.leaderboards[carName].progress;

            leaderboards.push({"car": car, "progress": progress});
        }

        leaderboards.sort((a, b) => (a.progress < b.progress) ? 1 : -1);
        return leaderboards;
    }

    getCarProgress(car) {
        return constrain(car.getPosition().x/(this.terrain.length * this.terrain.step), 0, 1);
    }

    destroyBadCars() {
        for(let i = 0; i < this.cars.length; i++) {
            // If car is stopped for some time
            if(this.cars[i] && this.cars[i].getTimeStopped() > Race.maxStoppedTime) {
                let stoppedCar = this.cars.splice(i, 1);
                stoppedCar = null;
            }

            // If car out of bounds
            if(this.cars[i] && this.cars[i].getPosition().y > height + Car.magRange[1]) {
                let awayCar = this.cars.splice(i, 1);
                awayCar = null;
            }
        }
    }

    updateLeaderboards() {
        for(let i = 0; i < this.cars.length; i++) {
            if(this.cars[i]) {
                let name = this.cars[i].name;
                this.leaderboards[name].progress = this.getCarProgress(this.cars[i]);
            }
        }
    }

    update() {
        if(this.cars.length == 0) {
            if(this.raceOver) {
                let finalLeaderboards = this.getLeaderboards();
                this.raceOver(finalLeaderboards);
            }

            this.running = false;
        }
        else {
            this.destroyBadCars();
            this.updateLeaderboards();

            this.running = true;
        }
    }

    draw() {
        if(this.running) {
            for(let c of this.cars) {
              c.draw();
            }
        }

        // Draw terrain
        this.terrain.draw();
    }
}
