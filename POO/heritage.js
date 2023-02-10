const Vehicule = require('./exo_voitures')

class Moto extends Vehicule {

    #retro;

    constructor(enginePower, retro) {
        super(2, enginePower)
        this.#retro = retro;
    }

    toString() {
        return "Ma moto est un " + super.toString()
    }

    ajouterRetro() {
        if (this.#retro === false) {
            this.#retro = true
        }
    }

    get nbWheels() {
        return this.nbWheels
    }
}

const honda = new Moto(80, true)

console.log(honda.toString());


class Voiture extends Vehicule {

    #retro;

    constructor(enginePower) {
        super(4, enginePower)
        this.#retro = true;
    }

    toString() {
        return `Coucou c'est ma voiture`
    }
}

class Tank extends Vehicule {
    #canon;

    constructor(enginePower) {
        super(2, enginePower)
        this.#canon = true;
    }

    toString() {
        return `Coucou c'est mon tank`
    }
}


