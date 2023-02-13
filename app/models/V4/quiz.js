const sequelize = require('../../db');
const {
    Model,
    DataTypes
} = require('sequelize');
const {
    RowDescriptionMessage
} = require('pg-protocol/dist/messages');


class Quiz extends Model {}

Quiz.init({
    title: {
        type: DataTypes.TEXT, // on dit ici que name sera du type TEXT
        allowNull: false, // la valeur doit être différente de null
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    sequelize: sequelize, // où est ce qu'on peut trouver le lien à la BDD? (donc on lui passe notre module venant de db.js)
    tableName: 'quiz' // autre info vitale, de quelle table on parle?
})

module.exports = Quiz;