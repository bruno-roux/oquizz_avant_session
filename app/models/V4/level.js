
// on récupère sequelize
const sequelize = require('../../db');
// dans sequelize on retrouve une classe s'appelant Model qui sert de moule à l'instanciation de nos modèles 
// dans cette classe on va retrouver toutes les méthodes permettant de faire des requêtes àa la BDD (insert, update, get, delete ...)
// DataTypes permet de définir pour sequelize quel type de valeur il va recevoir 
// on récupère le module Model
const {Model, DataTypes} = require('sequelize')
// à partir de là on peut appeler les méthodes venant de Model
class Level extends Model {}


// Maintenant qu'on a lié sequelize à notre classe Level, on va décrire chaque colone de notre table


// On va avoir besoin d'initialiser level en spécifiant ses caractéristiques 
Level.init({ // le init se décompose en 2 parties : la première : les types dans la classe
   name: {
    type: DataTypes.TEXT, // on dit ici que name sera du type TEXT
    allowNull: false, // la valeur doit être différente de null
   }
}, {
    sequelize: sequelize, // où est ce qu'on peut trouver le lien à la BDD? (donc on lui passe notre module venant de db.js)
    tableName: 'level' // autre info vitale, de quelle table on parle?
})


module.exports = Level;