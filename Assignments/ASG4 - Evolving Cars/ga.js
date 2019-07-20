class Individual {
    constructor(indSize) {
        this.indSize = indSize;
        this.gens = new Array(indSize);
        this.fitness = 0;

        this.init();
    }

    init() {
        for(let i = 0; i < this.indSize; i++) {
            this.gens[i] = int(random(2));
        }
    }
}

class GeneticAlgorithm {
    constructor(popSize, indSize, fitFunc, mutationRate) {
        this.indSize = indSize;
        this.popSize = popSize;
        this.fitFunc = fitFunc;

        this.init();
    }

    init() {
        this.population = new Array(this.popSize);
        for(let i = 0; i < this.popSize; i++) {
            // Initialize individual i randomly
            this.population[i] = new Individual(this.indSize);
        }
    }

    evolve() {
        for(let i = 0; i < n; i++)  {
            this.evaluate();

            let matingPool = this.select();
            let newPopulation = this.reproduce(matingPool);
            this.mutate(newPopulation);

            this.population = newPopulation;
        }

        this.evaluate();
        return this.best();
    }

    evaluate() {
        for(let i = 0; i < this.popSize; i++) {
            let individual = this.population[i];
            individual.fitness = this.fitFunc(individual.gens)
        }
    }

    select() {
        let matingPool = new Array();

        // Select this.popSize Individual to be the parents
        for(let i = 0; i < this.popSize; i++) {
            let survivor = this.rouletteWheel();
            matingPool.push(survivor);
        }

        return matingPool;
    }

    rouletteWheel() {

    }

    reproduce(matingPool) {

    }

    crossover(parentA, parentB) {

    }

    mutate(newPopulation) {

    }

    best() {

    }
}
