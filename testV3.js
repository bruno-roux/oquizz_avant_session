const Level = require('./app/models/V3/level')


async function test() {

    // on veut créer un niveau 'légendaire'
    const legendaryLevel = await Level.build({name: 'légendaire'});
    // on va maintenant le sauvegarder en BDD (côté SQL)
    await legendaryLevel.save();

    // on veut modifier notre niveau
    legendaryLevel.name = 'Légendaire'; // il manquait une majuscule
    await legendaryLevel.save();

    // on a trop créé de levels 'Légendaire', donc on va supprimer celui-ci
    // Pour supprimer un ligne dans la BDD, on passe par la classe et pas par l'instance, vu qu'elle être supprimée

    await Level.destroy({
        where: {
            name: 'Légendaire'
        }
    })
    // on aimerait voir si les données qu'on souhaitait supprimées ont été supprimées
    // on va faire un findAll permettant de récupérer tous les éléments d'une table
    // ici aussi on va passer par la classe et pas l'instance
    const levels = await Level.findAll()
    console.log(levels);
}

test();