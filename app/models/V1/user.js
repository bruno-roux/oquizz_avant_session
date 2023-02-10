const CoreModel = require("./coreModel")
// on récupère le client pour faire des requêtes
const client = require('../../db');


class User extends CoreModel {
    firstName;
    lastName;
    email;
    password;

    constructor(obj) {
        super(obj)
        this.firstName = obj.firstname;
        this.password = obj.password;
        this.lastName = obj.lastname;
        this.email = obj.email;
    };

    // on définit une méthode static (qu'on va appeler depuis la classe et pas une instance) qui va éxécuter une requete à la db
    // on utilise la syntaxe async await
    static findAll = async () => {
        // on wrap notre fonction dans un bloc try catch
        try {
            // on récupère les rows renvoyé par notre requête à la db via la destructuration
            const {
                rows,
                rowCount
            } = await client.query('SELECT * FROM "user"');


            if (!rowCount) {
                return []
            }
            console.log(rows);
            // on initialise un tableau vide 
            let users = [];
            // on boucle à travers tous les rows obtenus
            for (let obj of rows) {
                // pour chaque row on instancie un nouveau Level en lui passant le row en paramètre
                // on push chaque instance dans notre tableau
                users.push(new User(obj));
            }

            // on retourne ensuite le tableau
            return users;
        } catch (err) {
            // le code du catch est lu à la moindre erreur qui survient dans le try
            throw new Error(err)
        }
    };

    static findById = async (id) => {
        const query = {
            text: 'SELECT * FROM "user" WHERE id = $1',
            values: [id]
        }
        try {
            const {
                rows,
                rowCount
            } = await client.query(query);
            if (!rowCount) {
                console.log(rows);
                return []
            }
            // on retourne rows[0] car on sait qu'on reçoit un tableau avec 1 seul item
            return new User(rows[0])
        } catch (err) {
            throw new Error(err)
        }
    };

    insert = async () => {
        const query = {
            text: 'INSERT INTO "user" (firstname, lastname, email, password ) VALUES ($1, $2, $3, $4) returning id',
            values: [this.firstName, this.lastName, this.email, this.password]
        }
        try {
            const {
                rows
            } = await client.query(query);
            console.log("ROWS -> ", rows);

            // insert() va ensuite récupérer l'id généré par la db pour notre nouvelle donnée et le renseigner sur la propriété id de notre instance
            this.id = rows[0].id;
            console.log(this.id);
            return this;
        } catch (err) {
            throw new Error(err)
        }
    };

    // delete va supprimer la ligne de la db correspondant à l'instance depuis laquele delete() est appelé (car il récupère this.id)
    delete = async () => {
        const query = {
            text: 'DELETE FROM "user" WHERE id = $1',
            values: [this.id]
        }
        try {
            const res = await client.query(query);
            console.log(res);
        } catch (err) {
            throw new Error(err)
        }
    };

    update = async () => {
        // ici on modifie d'abord les propriétés de notre instance

        const query = {
            text : 'UPDATE "user" SET (firstname, lastname, email, password) = ($1, $2, $3, $4) WHERE id = $5',
            // puis on envoie ces nouvelles valeurs dans notre query
            values : [this.firstName, this.lastName, this.email, this.password, this.id]
        }
        try {
            const res = await client.query(query);
            console.log(res);
        } catch (err) {
            throw new Error(err);
        }
    };


}


module.exports = User;