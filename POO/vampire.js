// j'importe ma classe Mere Person
const Person = require('./class')

// je crée une nouvelle classe Vampire qui hérite de Person
class Vampire extends Person {

    // j'initialise une propriété statique avec le mot-clé static pour qu'elle soit liée à notre classe et pas aux instances (persistance sur la classe)
    static nbr_vampires = 0;

    // j'initialise par défaut la propriété state (héritée de la classe mère) à "mort-vivant" afin que toutes mes instances soient initialisées avec state = "mort-vivant"
    #state = "mort-vivant";

    // constructor => prend les mêmes paramètres que la classe mère et lui passe ces paramètres via le super constructeur (= constructeur de la classe mère) (appelée avec le mot-clé super)
    constructor(firstName, lastName, age) {
        // à chaque instanciation/création de Vampire j'incrémente ma propriété statique
        Vampire.nbr_vampires++;
        super(firstName, lastName, age)
    }

    // je crée une méthode hello qui surcharge la méthode hello héritée de la classe mère
    hello() {
        return super.hello() + ` et je suis un Vampire parmi ${Vampire.nbr_vampires} vampires crées`
    }
}

const dracula = new Vampire("Vlad", "Tepes", 230);
console.log(dracula.hello());
const mordicus = new Vampire("mordi", "cus", 430);

console.log(mordicus.hello());
console.log(dracula.hello());

// on veut garder un comte du nombre de Vampires

// méthode Vampire.toString() qui annonce le nbr de vampires crées