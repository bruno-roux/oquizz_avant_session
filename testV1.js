const User = require('./app/models/V1/user');




async function userTest() {
    try {

      
    
        const newUser = new User({firstname: 'John', lastname: 'Johnson', email: 'ok@ok.fr', password: 'abcdef'});
        await newUser.insert();

        // Test de delete
        await newUser.delete();

    
        // Test de findById
        // 3 représente l'id de l'utilisateur qu'on cherche
        const oneUser = await User.findById(3);
        console.log(oneUser);

        // Test de update
        oneUser.lastName = "Michel";
        await oneUser.update()


        // Test de findAll
        // ici await nous permet d'attendre le résultat avant d'exécuter la ligne suivante
        const result = await User.findAll();
        console.log(result);

    } catch(error) {
        console.log(error);
    };

    
}

userTest();





