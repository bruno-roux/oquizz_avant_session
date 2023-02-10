const client = require("../../db");

class CoreModel {
    #id;
    #created_at;
    #updated_at;

    static tableName = null; // dans chaque constructeur enfant, on va venir surcharger cette valeur, afin que chaque classe enfant possède à l'intérieur d'elle même une nommination qu'on va pouvoir utiliser dans les méthodes qu'on veut;

    constructor(obj) {
        this.#id = obj.id;
        this.#created_at = obj.created_at;
        this.#updated_at = obj.updated_at;
    };

    get id() {
        return this.#id;
    };
    set id(newid) {
        this.#id = newid;
    };

    static async findAll() {
     
        // grâce à tableName on a rendu notre findAll générique, et cette variable va aussi nous servir pour la suite
        const query = `SELECT * FROM "${this.tableName}"`;
        const {rows, rowCount: index} = await client.query(query);

        // maintenant qu'on a récupéré les données, on va les convertir
        // cette requête nous renverra un tableau d'objets, chaque objet va représenter un user ou un level ou une question etc ...
        // on va pouvoir parcourir le tableau, et pour chaque objet dans le tableau, créer une instance
        // pour parcourir le tableau, au lieu de faire un for of (complètement judicieux ici), on va utiliser map
        // map va parcourir les éléments du tableau, pour chaque élément il va réaliser l'action dans le callback qu'on va écrire, entre les parenthèses du callback se trouve l'élément actuellement parcouru par map

        // rows contient un tableau d'objet contenant les instances
        //console.log("ROWS ------------------>", rows)
        const res = rows.map(row => new this(row));
        return res;
    };
    

    async insert() {
        console.log("on passe la")
        // on va récupérer les données de l'instance
        console.log(this);
        // vu que le insert est générique, on ne va pas pouvoir assigner des valeurs en "dur", en effet on ne sait pas si notre instance contient un champ name, description, email etc ... Donc on a besoin de trouver automatiquement les clés de l'instance

     
        // ici on récupère dans un tableau à 2 dimensions les clés et valeurs cotnenues dans l'instance qui a appelé insert   
        const entries = Object.entries(this);
        console.log(entries);

        // on prépare des tableaux pour stocker les données, les clés et les index
        let keys = [];
        let values = [];
        let indexes = [];
        // pour chaque propriété récupérée de l'instance :
        let position = 1; 
        
        
        // Méthode traditionnelle
        // for (const entry of entries) {
        //     // on stocke tout ça pour l'envoyer à la BDD
        //     console.log('entry : ', entry);
        //     keys.push(entry[0]); // à entry[0] on retrouve la clé
        //     values.push(entry[1]) // ici la valeur associée à la clé
        //     indexes.push(position);
        //     position++;
        // }


        // for of developpé
        // ici cas particulier : on fait un for of sur un tableau à 2 dimensions, le for of va s'occuper de boucler sur la première dimension, et on va se retrouver avec pour chaque tour de boucle un tableau qui ressemble à ça : 
        // ['name', 'geographie'], donc à chaque tour de boucle on va avoir un tableau avec 2 valeurs à l'intérieur
    
        for(const [key, value] of Object.entries(this) ) {
            keys.push(key); // à entry[0] on retrouve la clé
            values.push(value) // ici la valeur associée à la clé
            indexes.push(`$${position}`); // va représenter les $1 $2 $3... des querys
            position++;
        }
        // on crée notre requête

        const tableName = this.constructor.tableName; // via this.constructor, on remonte à la classe qui a permi de construire l'instance qui a appelé insert

        /* 
        si ci-dessus on a fait un indexes.push(position), en dessous on aura besoin de mettre des $1 $2 $3 ... , pour ce faire on peut utiliser le join suivant
        ($${values.join( ,$)}) */
        const query = {
            text: `INSERT INTO "${tableName}" (${keys.join(", ")})
            VALUES (${indexes.join(", ")})
            RETURNING "id", "created_at"
            `, // on a créé le message permettant de faire tous les insert
            values: values
        }
        // on envoie la requête préparée et on attend le résultat
        const result = await client.query(query);

        // on vérifie si on a bien une réponse valide de la BDD
        if (result.rowCount === 0) {
            // si on a pas de résultats :
            throw new Error(`${tableName} entity not inserted`);
        }
        // si on a passé la vérification, on renvoie à l'utilisateur l'entité créé
        // l'id étant une part importante des entités générées (pour pouvoir ensuite les update), on va seter l'id récupéré sur l'instance à renvoyer
        
        // on a récupéré l'id
        this.#id = result.rows[0].id;
        this.#created_at = result.rows[0].created_at;
        return this;
    }
}
module.exports = CoreModel;