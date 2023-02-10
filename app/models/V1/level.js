// on importe notre classe mère CoreModel
const CoreModel = require("./coreModel");
const client = require('../../db');

// on définit une nouvelle classe (qui commence par une majuscule) avec le mot clé 'class' qui hérite de CoreModel
class Level extends CoreModel {
 
    name;
    
    // le constructeur prend des paramètres (ils peuvent se présenter sous forme d'objet) qu'il va attribuer comme valeur aux propriétés de l'instance
    constructor(obj) {
        // on appelle le constructeur de la classe mère via le mot clé 'super' et on lui passe notre objet en paramètre car c'est qui va gérer l'id de notre instance
        super(obj)
        // on vérifie le bon type des données passées en paramètre avant de les attribuer aux propriétés
        if (typeof obj.name !== 'string') {
            throw new Error('types invalides : ' + obj)
        }
        this.name = obj.name;
    }

    // on définit une méthode static (qu'on va appeler depuis la classe et pas une instance) qui va éxécuter une requete à la db
    // on utilise la syntaxe async await
    static findAll = async () => {
        // on wrap notre fonction dans un bloc try catch
        try {
            // on récupère les rows renvoyé par notre requête à la db via la destructuration
            const {rows, rowCount} = await client.query('SELECT * FROM level');
            if (!rowCount) {
                return []
            }
            // on initialise un tableau vide 
            let levels = [];
            // on boucle à travers tous les rows obtenus
            for (let obj of rows) {
                // pour chaque row on instancie un nouveau Level en lui passant le row en paramètre
                // on push chaque instance dans notre tableau
                levels.push(new Level(obj));
            }
            rows.map((r) => {
                console.log(r.name + ' | ' + r.id);
            });
            // on retourne ensuite le tableau
            return levels;
        } catch (err) {
            // le code du catch est lu à la moindre erreur qui survient dans le try
            throw new Error(err)
        }
    }

    // même chose que pour la méthode findAll (toujours en statique car on agit sur la table entière et pas une ligne donc pas une instance de classe)
    // la seule différence c'est qu'on passe l'id de la donnée qu'on cherche en paramètre
    static findById = async (id) => {
        const query = {
            text : 'SELECT * FROM level WHERE id = $1',
            values : [id]
        }
        try {
            const {rows, rowCount} = await client.query(query);
            if (!rowCount) {
                console.log(rows);
                return []
            }
            // on retourne rows[0] car on sait qu'on reçoit un tableau avec 1 seul item
            return new Level(rows[0])
        } catch (err) {
            throw new Error(err)
        }
    }

    // ici on va déclarer des méthodes non statiques car liées aux instances d enotre classe et donc appelable uniquement depuis une instance(instance.insert() et pas Level.insert())

    // méthode insert qui va insérer dans la db une nouvelle ligne depuis les valeurs des propriétés de l'instance depuis laquelle insert() est appelé
    insert = async () => {
        const query = {
            text : "INSERT INTO level (name) VALUES ($1) RETURNING id",
            values : [this.name]
        }
        try {
            const {rows} = await client.query(query);
            // insert() va ensuite récupérer l'id généré par la db pour notre nouvelle donnée et le renseigner sur la propriété id de notre instance
            this.id = rows[0].id;
            console.log(this.id);
            return this;
        } catch (err) {
            throw new Error(err)
        }
    }
    
    // delete va supprimer la ligne de la db correspondant à l'instance depuis laquele delete() est appelé (car il récupère this.id)
    delete = async () => {
        const query = {
            text : "DELETE FROM level WHERE id = $1",
            values : [this.id]
        }
         try {
            const res = await client.query(query);
            console.log(res);
        } catch (err) {
            throw new Error(err)
        }
    }

    // même chose que pour le delete, doit être appelée depuis une instance renvoyée par la db pour avoir accès a this.id et prend en paramètre les nouvelles valeurs de notre objet qui seront ensuite modifiées dans la db
    update = async (newname) => {
        // ici on modifie d'abord les propriétés de notre instance
        this.name = newname;
        const query = {
            text : "UPDATE level SET name = $1 WHERE id = $2",
            // puis on envoie ces nouvelles valeurs dans notre query
            values : [this.name, this.id]
        }
        try {
            const res = await client.query(query);
            console.log(res);
        } catch (err) {
            throw new Error(err)
        }
    }

}

const obj = {id : null, name : 'très dur', created_at : null ,updated_at : null}

// const facile = new Level(obj)

Level.findById(7).then(instance => {
    instance.update('Légende')
})

// pour afficher le resultat de notre findAll on doit attendre la résolution de la Promise donc on fait le console.log dans un .then()
Level.findAll().then((levels) => console.log(levels));

module.exports = Level;