const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Tag extends Model{};


Tag.init({
  name: { type: DataTypes.STRING, allowNull: false}, 
 

},{
  sequelize: sequelize, // on mentionne la connexion à la BDD
  tableName: "tag"

})

// on exporte la class directement !
module.exports = Tag;