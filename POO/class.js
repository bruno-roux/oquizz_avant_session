// on définit une classe avec le mot clé "class"
class Person {

    // 1 : on définit les propriétés/champs de notre classe
    // le # devant une propriété permet de la passer en "privé"
    // privé => pas de modification depuis l'extérieur de la classe 
    #firstName;
    #lastName;
    #age;
    #couleur_yeux;
    #state = "vivant";
  
    // 2 : on initialise un constructeur qui va être appelé à chaque instanciation de notre classe
    // le constructeur prend des paramètres qui peuvent définir la valeur de certaines ou toutes le spropriétés de notre instance
    constructor(firstName, lastName, age) {
        // dans le constructeur on peut définir des contraintes (de type ou autre)
        if (typeof firstName !== "string" || typeof lastName !== "string" || typeof age !== "number") {
            throw new Error("types invalides")
        }
        // le constructeur assigne une valeur aux propriétés de notre instance (selon les paramètres passés au constructeur ou pas)
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#age = age;
        // ici on passe une valeur par défaut à "couleur_yeux" qui n'est pas renseignée via un paramèetre du constructeur
        this. #couleur_yeux = "marron";
    }

    // ici on définit une méthode qui peut accéder aux propirétés (même privées car la méthode est à l'intérieur de la classe) de l'instance de classe et qui nous retourne une valeur ou une action
    hello() {
        return `Bonjour je m'appelle ${this.#firstName} ${this.#lastName} et j'ai ${this.#age} ans :) `;
    }

    // setter pour modifier les propriétés de mon instance (même privées car dans le même scope) selon certaines règles
    setFirstName(newFirstName) {
        if (typeof newFirstName !== "string") {
            throw new Error("Person firstName must be a string : " + typeof newFirstName)
        }
        this.#firstName = newFirstName
    }

    // param = "45"
    setAge(age) {
        if (typeof age !== "number") {
            if (isNaN(parseInt(age))) {
                throw new Error("l'age doit être un nombre")
            }
            this.#age = parseInt(age);
        }
        this.#age = age;
    }

    // getter pour obtenir une propriété (même privée) dans le scope de la classe
    getFirstName() {
        return this.#firstName
    }


}

// on instancie "teo" une nouvelle instance de la classe Person
// const teo = new Person("Teo", "PL", 45)

// teo.setAge("uiyiuyiyu")

// teo.hello()

// ici on obtient une erreur car la propriété privée n'est pas accessible en dehors du scope de la classe / la portée de la propriété privée est limitée à l'intérieur de la classe
// teo.#age = 12;

module.exports = Person;