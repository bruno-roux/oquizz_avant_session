const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../db');

class Answer extends Model{};


Answer.init({
  description: { type: DataTypes.STRING, allowNull: false}, 


},{
  sequelize: sequelize, // on mentionne la connexion à la BDD
  tableName: "answer"

})

// on exporte la class directement !
module.exports = Answer;