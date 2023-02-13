const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../../db');

class User extends Model {};


User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    }, // on utilise STRING car nos textes seront relativement court (à peine - grand qu'un tweet)
    password: {
        type: DataTypes.STRING
    }

}, {
    sequelize: sequelize, // on mentionne la connexion à la BDD
    tableName: "user"

})

// on exporte la class directement !
module.exports = User;