const { rows } = require('pg/lib/defaults');
const client = require('./db');
const Level = require('./models/level');
const User = require('./models/user');

const dataMapper = {
    getAllLevels : (callback) => {
        client.query('SELECT * FROM level', (err, res) => {
            //gestion des erreurs
            if (err) {
                return callback(err, null)
            }
            // cas ou on n'a aucune donnée dans la table
            if (!res.rowCount) {
                return callback(null, [])
            } else {
                let levels = [];
                for (let obj of res.rows) {
                    levels.push(new Level(obj));
                }
                return levels;
            }
        })
    },

    getOneLevelById : async (id) => {

        const query = {
            text : "SELECT * FROM level WHERE id = $1",
            values : [id]
        }

        try {
        const {rows} = await client.query(query)
        console.log(rows[0]);
        } catch (err) {
            throw new Error(err)
        }
    }
}

dataMapper.getOneLevelById(2)