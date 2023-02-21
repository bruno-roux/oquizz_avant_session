const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Question extends Model{};


Question.init({
  question: { type: DataTypes.STRING, allowNull: false}, 
  anecdote: DataTypes.STRING, // on utilise STRING car nos textes seront relativement court (à peine - grand qu'un tweet)
  wiki: DataTypes.STRING

},{
  sequelize: sequelize, // on mentionne la connexion à la BDD
  tableName: "question"

})

// on exporte la class directement !
module.exports = Question;