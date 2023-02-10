const CoreModel = require("./coreModel")

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
    }
}

module.exports = User;