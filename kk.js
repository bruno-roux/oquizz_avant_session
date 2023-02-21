const { User, Question, Tag } = require("./app/models")

const quiz = await Quiz.findByPk( quizId, {
    attribut:['title','description'], 
    include :[{association :'tag_list', },{association :'question_list', attributes : ['question','anecdote','wiki'], 
        include : [{ association : 'level',  attributes : ['name']},{association : 'answer_list', attributes : ['description']}]
    },{ association :'author', attributes : ['firstname','lastname']}]
})


const quiz = await Quiz.findByPk( quizId, {
    include:[
        {
            model:User,
            as:"author",
            //attributes: ["firstname","lastname"]
        },
        {
            model:Question,
            as:"question_list",
        },
        {
            model:Tag,
            as : "tag_list"
        }

    ]
});

const quiz = await Quiz.findByPk( quizId, {
    include :[
        {association:'author'},
        {association:'question_list', include:['level','answer_list']},
        {association:'tag_list'}
    ]
    
});


attributes :["firstname","lastname"],















