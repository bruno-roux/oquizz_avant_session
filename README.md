# O'quiz

## Jour 4 : Atelier, Sprint 1

Fini les tests ! Maintenant qu'on a des super modèles, on va brancher tout ça dans notre archi Express !

### Visualiser les titres, la description et les auteurs des quiz sur la page d’accueil

Remplacer les fausses données "en dur", de la page d'accueil, par les données issues des Models !

Ici, se servir de la documentation Sequelize est une bonne idée (cf [les associations](https://sequelize.org/master/manual/eager-loading.html)).
Au revoir les dataMappers pour ce coup-ci !

### Pouvoir accéder aux questions d’un quiz

Il va falloir une nouvelle route (`/quiz/:id`).

Coder la méthode correspondante dans un nouveau controlleur (`quizController`).

Ici aussi, Sequelize va être bien pratique...

1. pouvoir visualiser la difficulté de chaque question

2. visualiser tous les sujets rattachés au quiz

### pouvoir visualiser tous les sujets

Nouvelle route (`/tags`)

Nouveau controller (`tagController`)

### pouvoir visualiser tous les quiz pour un sujet donné

Astuce : utiliser le model Tag, et se servir des "includes" de Sequelize pour en déduire les quiz concernées !

### :v: Bonus facile : Ajouter tous les liens qui pourraient manquer

Il y a surement des endroits où il serait intéressant de pouvoir cliquer, afin de rendre la navigation plus fluide.

### :skull_and_crossbones::clock4: Bonus de la mort où j'ai une semaine devant moi et je savais pas quoi faire : formulaires

Rajouter les formulaires d'inscription et de connexion.
Avec tout ce qui est nécessaire (Ajout en base de données, login en session plus ou moins longue)





# E04 - Challenge

On a un super ORM, on créé des models ?

Créer le model Question (ou un autre, selon ce qui a été fait en cockpit, mais idéalement un model qui aura une association avec celui créé en cockpit, pour le bonus)

Commencer par vérifier que tout fonctionne en écrivant quelques tests dans test.js, par exemple (adapter selon ce qui a été fait en cockpit) :

*   Trouver toutes les Question.
*   Trouver la question dont l'id est 3.
*   Créer un Level avec le nom "très difficile" et l'insérer en BDD.
*   ...

Bonus qui pique (mais qui sera corrigé)  

Récupérer une Question avec son Level associé : https://sequelize.org/docs/v6/core-concepts/assocs/



## E01 - Gestion de Projet


**rappel CRUD**

Méthodes d'interaction avec la base de données :

C -> Create
R -> Read
U -> Update
D -> Delete


## E02 - POO et Héritage

[voir cours ici](./POO)


## E03 - Architecture et ActiveRecord
