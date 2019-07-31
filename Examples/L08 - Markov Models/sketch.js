
let ilegalChars = {" ": 0};
let name = "";

function setup() {
    createCanvas(500,500);

    // Estimate probability distribution for the dataset of names
    let pd = train();
    name = generateName(pd);
    console.log(pd);
}

function draw() {
    background(230);
    textSize(24);

    text(name, width/2, height/2);
}

function generateName(pd) {
    let nstate = sample(pd, "#");
    let name = "";

    while(nstate !== "#") {
        name += nstate;
        nstate = sample(pd, nstate);
        console.log(nstate);
    }

    return name;
}

function train() {
    let pd = {};

    // Load all states
    for(let name of names) {
        name = "#" + name + "#";
        for(let c of name) {

            c = c.toLowerCase();
            if(!(c in ilegalChars) && !(c in pd)) {
                // Create a new state for this character
                pd[c] = {};
            }
        }
    }

    // Estimate probability distribution
    for(let name of names) {
        name = "#" + name.toLowerCase() + "#";

        for(let i = 0; i < name.length - 1; i++) {
            let cstate = name[i];
            if(cstate in pd) {

                let nstate = name[i + 1];

                if(!(nstate in pd[cstate])) {
                    pd[cstate][nstate] = 0;
                }

                pd[cstate][nstate] += 1;
            }
        }
    }

    // Normalize pd
    for(let cstate in pd) {
        let ctotal = 0;
        for(let nstate in pd[cstate]) {
            ctotal += pd[cstate][nstate];
        }

        for(let nstate in pd[cstate]) {
            pd[cstate][nstate] /= ctotal;
        }
    }

    return pd;
}

function sample(pd, istate) {
    let r = random();
    let probSoFar = 0;

    for(let nstate in pd[istate]) {
        probSoFar += pd[istate][nstate];

        if(r < probSoFar) {
            return nstate;
        }
    }
}
