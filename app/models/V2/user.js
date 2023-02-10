const CoreModel = require("./coreModel")
// on récupère le client pour faire des requêtes
const client = require('../../db');


class User extends CoreModel {

    static tableName = "user"; // ici toutes les instances de User mais aussi User elle même contiennent le nom de leur table

    firstName;
    lastName;
    email;
    password;

    constructor(obj) {
        super(obj)
        // on pourrait prévoir un check de valeurs et de type
        this.firstName = obj.firstname;
        this.password = obj.password;
        this.lastName = obj.lastname;
        this.email = obj.email;
    };
}


module.exports = User;