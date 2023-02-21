// index.js est le point d'entrée de notre dossier models

// on y importe puis exporte tous les models
const Level = require('./level');
const Answer = require('./answer');
const User = require('./user');
const Tag = require('./tag');
const Question = require('./question');
const Quiz = require('./quiz');


//ici on va définir les associations

// on pense en terme de 'propriétaire' du model (avec les mots clés Has et Belongs), un propriétaire va déposer sa FK (foreign key) sur le model cible qu'il possède
// on défini un alias avec la porp 'as' qui va nous permettre de nous réferrer au model à inclure lors des requêtes

// LEVEL / QUESTION
// question.level
Question.belongsTo(Level, {
    foreignKey: "level_id",
    as: "level"
});
// level.questions
Level.hasMany(Question, {
    foreignKey: "level_id",
    as: "question_list"
});

// QUESTION / ANSWER
// relation "possède"
// answer.question
Answer.belongsTo(Question, {
    foreignKey: "question_id",
    as: "question"
})
// question.answers
Question.hasMany(Answer, {
    foreignKey: "question_id",
    as: "answer_list"
})
// particularité --> la relation "valide" pour la bonne réponse
// on trouve sur la question la FK de la bonne réponse uniquement
// question.good_answer
Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'good_answer'
})

// QUIZ / QUESTION
// question.quiz
Question.belongsTo(Quiz, {
    foreignKey: "quiz_id",
    as: "quiz"
});
// quiz.questions
Quiz.hasMany(Question, {
    foreignKey: "quiz_id",
    as: "question_list"
});

// USER / QUIZ
// user.quizzes
User.hasMany(Quiz, {
    foreignKey: "user_id",
    as: "quiz_list"
});
// quiz.user
Quiz.belongsTo(User, {
    foreignKey: 'user_id',
    as: "author"
});

// QUIZ / TAG
// quiz.tags
Quiz.belongsToMany(Tag, {
    as: "tag_list",
    through: 'quiz_has_tag',
    foreignKey: "quiz_id",
    otherKey: "tag_id"
})
// tag.quizzes
Tag.belongsToMany(Quiz, {
    as: "quiz_list",
    through: "quiz_has_tag",
    foreignKey: "tag_id",
    otherKey: "quiz_id"
})

module.exports = {
    Answer,
    Question,
    Quiz,
    User,
    Level,
    Tag
}