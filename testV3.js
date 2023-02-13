
// on va récupérer un fichier qui centralise et met en rapport tous les modèles
// lorsqu'on fait un require sur un dossier, par défault, le require va chercher un fichier dans ledit dossier, par défaut, le require va être fait sur le fichier index.js se trouvant dans ce dossier
const Level = require('./app/models/V3/level')
const Question = require('./app/models/V3/Question')



// pour faire des requêtes avec des opérateurs on récupère le module ci dessous : 
const {
    Op
} = require('sequelize');


async function test() {

    // on veut créer un niveau 'légendaire'
    const legendaryLevel = await Level.build({
        name: 'légendaire'
    });
    // on va maintenant le sauvegarder en BDD (côté SQL)
    await legendaryLevel.save();

    // on veut modifier notre niveau
    legendaryLevel.name = 'Légendaire'; // il manquait une majuscule
    await legendaryLevel.save();

    // on a trop créé de levels 'Légendaire', donc on va supprimer celui-ci
    // Pour supprimer un ligne dans la BDD, on passe par la classe et pas par l'instance, vu qu'elle être supprimée

    await Level.destroy({
        where: { // équivalent de WHERE NAME = 'Légendaire'
            name: 'Légendaire'
        }
    })
    // on aimerait voir si les données qu'on souhaitait supprimées ont été supprimées
    // on va faire un findAll permettant de récupérer tous les éléments d'une table
    // ici aussi on va passer par la classe et pas l'instance
    const levels = await Level.findAll()
    console.log(levels);
}

async function testChallFindAll() {

    // 1er test : on peut appeler findAll depuis Question directement (donc depuis la classe) car findAll ne nécéssite pas d'informations particulières
    let results = await Question.findAll({
        where: {
            id: {
                [Op.gt]: 100,
            }
        }
    });
    console.log(results);

}

async function testChallFindAllLevels() {

    // 1er test : on peut appeler findAll depuis Question directement (donc depuis la classe) car findAll ne nécéssite pas d'informations particulières
    let results = await Level.findAll();
    console.log(results);

}

async function testChallFindOne() {
    try {
        // 2eme test : chercher une question en fonction de son ID 
        let question1 = await Question.findOne({
            where: {
                id: 3
            }
        });
        // sans le await, on aurait pas attendu que question1 récupère le résultat de la requête et le console.log aurait été vide !
        console.log(question1);
    } catch (error) {
        console.log(error);
    }

}

async function testChallInsertQuestion() {
    try {
        // ici on a besoin de créer une instance avant d'utiliser insert ! 

        const newQuestion = await Question.build({
            question: '2+2',
            anecdote: '+ means "plusss"',
            wiki: "l'addition a été découverte par les atlantes"
        });

        await newQuestion.save();
    } catch (error) {
        console.log(error);
    }
}

async function testChallCreateLevel() {
    // ici on utilise create au lieu de build, ce qui nous permet d'un trait, de créer une instance ET de la sauvegarder en BDD, là où pour build, ces 2 actions sont dissociées
    const newLevel = await Level.create({name: 'très difficile'});
}

// findOrCreate
// on peut se retrouver dans une situation où on ne sait pas à l'avance si on cherche à récupérer un champ ou à en créer un, pour pallier à ce problème, la méthode findOrCreate existe

async function createOrFind() { // !!! Cette fonction est celle qu'on crée, findOrCreate en revanche est une méthode inhérente à la classe Model

    // en fonction de l'action réalisée, level va être remplie, et created va posséder une valeur différente : true si level vient d'être créé et false si level a été trouvé
    const [level, created] = await Level.findOrCreate({
        where: { // on a un where pour trouver éventuellement ce qu'on cherche
            name: 'très difficile'
        },
        defaults: { // si on a rien trouvé on va attribuer les valeurs passées dans defaults
            name: 'très difficile'
        }
    });

    // on peut ensuite faire un check pour vérifier si la valeur a été crée ou trouvée : 
    if (created) {
        console.log("la valeur a été crée");
    } else {
        console.log("la valeur existait déjà")
    }

}

createOrFind();