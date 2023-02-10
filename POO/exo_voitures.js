// Créer une classe Vehicule

class Vehicule {

    static nbr_construits = 0;

    
    // Propriétés:
    // nbWheels, enginePower, isStarted

    #nbWheels;
    #enginePower;
    #isStarted;
    
    // Méthodes:
    
    // - constructor(nbWheels, enginePower) // isStarted est false par défaut

    constructor(nbWheels, enginePower) {
        Vehicule.nbr_construits += 1;
        this.#nbWheels = nbWheels;
        this.#enginePower = enginePower;
        this.#isStarted = false;
    }
    
    // - getters et setters de toutes les propriétés (pas de conditions dans les setters)

    get nbWheels() {
        return this.#nbWheels
    }
    get enginePower() {
        return this.#enginePower
    }
    get isStarted() {
        return this.#isStarted
    }

    set nbWheels(n) {
        this.#nbWheels = n;
    }
    set enginePower(n) {
        this.#enginePower = n;
    }

    // - start() et stop()
    start() {
        this.#isStarted = true;
    }

    stop() {
        this.#isStarted = false;
    }

    engine() {
        this.#isStarted = !this.#isStarted
    }
    
    // - toString() // renvoie "véhicule à X roues, de puissance Y, {est démarré | n'est pas démarré}.

    toString() {
        let start_status;
        if (this.#isStarted === true) {
            start_status = 'démarré';
        } else {
            start_status = 'éteint';
        }
        return `Véhicule à ${this.#nbWheels} roues, puissance ${this.#enginePower} cv, est ${start_status}`
    }
}
    // si on a le temps, on rajoute des conditions dans les setters !

    const moto = new Vehicule(2, 75)

    const oo = new Vehicule(2, 75)
    const mollto = new Vehicule(2, 75)

    console.log(Vehicule.nbr_construits);

    moto.start()

    console.log(moto.toString());

    module.exports = Vehicule;