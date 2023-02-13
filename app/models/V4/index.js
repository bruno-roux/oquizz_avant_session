// lorsqu'on fait un require sur un dossier, par défault, le require va chercher un fichier dans ledit dossier, par défaut, le require va être fait sur le fichier index.js se trouvant dans ce dossier

// l'objectif de la manip est de centraliser les require afin de n'avoir à en faire qu'un seul dans le reste du code

// Pour parler précisément de ce fichier index.js, il a 2 objectifs :

// Le principal : spécifier les associations entre les tables
// Le secondaire : faire un seul require

// Pour se faire : 

// On va récupérer tous les modèles du projet : 

const Quiz = require('./quiz');
const Level = require('./level');
const Question = require('./question');
const Tag = require('./tag');
const User = require('./user');
const Answer = require('./answer');


// Lorsqu'on veut créer un rapport entre 2 tables, on va devoir spécifier ce rapport dans les 2 sens, par exemple ci-dessous de user à quizz et de quizz à user
// la syntaxe est la suivante : on part de la classe concernée, on appelle la méthode spéciifer la liaison, puis entre parenthèses on passe en premier paramètre la classe à lier, et en 2eme paramètres les détails de cette liaison 
// on peut voir ci dessous la clé étrangère qui lie les tables, et "as" qui représente un alias, ou une manière simplifiée de requêter une liaison


// // Quiz <-> User (One to many)
// User.hasMany(Quiz, {
//     foreignKey: "user_id", // A VERIFIER
//     as: "quizzes"
// });

// Quiz.belongsTo(User, {
//     foreignKey: "user_id",
//     as: "quizzes"
// });

// Quiz <-> Tag (Many to many)
Quiz.belongsToMany(Tag, {
    as: "tags",
    through: "quiz_has_tag", // les quiz étant lié aux tags via une table de liaison, on a besoin de le spécifier ici
    foreignKey: "quiz_id",
    otherKey: "tag_id" // vu qu'on utilise une table de liaison, 2 clés sont utilisées pour mettre les tables en rapport, on spécifie la 2eme clé via "otherKey"
});

Tag.belongsToMany(Quiz, {
    as: "quizzes",
    through: "quiz_has_tag",
    foreignKey: "tag_id",
    otherKey: "quiz_id"
})


// Level <-> Question (One to many)
Level.hasMany(Question, {
    foreignKey: "level_id",
    as: "level" // ici on retrouve un alias, celui-ci permet de faire référence à un modèle sans le nommer directement, PS : cet alias sera la clé trouvée dans le resultat renvoyé par sequelize
});

Question.belongsTo(Level, {
    foreignKey: "level_id",
    as: "level"
});

// pour tout exporter d'un coup :
module.exports = { Level, Question, Quiz, User, Tag, Answer };