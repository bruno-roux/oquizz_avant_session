const { Sequelize } = require('sequelize');
const pg = require('pg');

require('dotenv').config();


const pgUrl = `postgres://oquiz:oquiz@localhost/oquiz`

const sequelize = new Sequelize(pgUrl, {
    // si on voulait faire un conversion de camelCase à snake_case
    define: {
        underscored: true
    }
});

module.exports = sequelize;

// POUR REGARDER UN TEST SUR UN MODELE, ALLER SUR V3/level.js