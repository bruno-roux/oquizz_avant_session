const CoreModel = require('./coreModel')

class Tag extends CoreModel {
    static tableName = 'tag';
    name;
    
    // le constructeur prend des paramètres (ils peuvent se présenter sous forme d'objet) qu'il va attribuer comme valeur aux propriétés de l'instance
    constructor(obj) {
        super(obj)
        // on vérifie le bon type des données passées en paramètre avant de les attribuer aux propriétés
        if (typeof obj.name !== 'string') {
            throw new Error('types invalides : ' + obj)
        }
        this.name = obj.name;
    };
}

module.exports = Tag;