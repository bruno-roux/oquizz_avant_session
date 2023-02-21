//***********************************************************/
//*****                                                 *****/
//*****                      quiz.js                    *****/
//*****                                                 *****/
//***********************************************************/




const {Quiz, User, Question, Tag, Answer,Level } = require("../models");
const { findByPk } = require("../models/quiz");

async function getAllQuiz(){
    const quizList = await Quiz.findAll()
    console.log(JSON.stringify(quizList, null, 4));
    return quizList;
}

async function getAllQuizWithAuthor(){
     const quizList = await Quiz.findAll({
        //*************************************/
        // include :{
        //     model : User,
        //     as : 'author'
        // } 
        //*************************************/
        // include : 'author'
        //*************************************/
        // include : ['author']
        //*************************************/
        // include : {
        //     association : 'author'
        // }
        //*************************************/
        attributes : [ 'id','title','description'],
         include : [{association : 'author', attributes : ['firstname','lastname'] }] 

     });

     //console.log(JSON.stringify(quizList, null, 4));
     return quizList;
}

async function getQuizWithDetails(quizId){
    const quiz = await Quiz.findByPk( quizId, {
        include:[
            {
                model:User,
                as:"author",
                attributes :["firstname","lastname"],
            },
            {
                model:Question,
                as:"question_list",
                include:[
                    {
                        model: Level,
                        as: "level",
                    },
                    {
                        model:Answer,
                        as: "answer_list",
                    }
                ],
            },
            {
                model:Tag,
                as : "tag_list"
            }
        ]
    });
    console.log(JSON.stringify(quiz, null,5));       
    return quiz;
}

//getQuizWithDetails(4);
module.exports = {getAllQuiz, getAllQuizWithAuthor,getQuizWithDetails};
