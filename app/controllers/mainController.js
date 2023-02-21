//***********************************************************/
//*****                                                 *****/
//*****              mainController.js                  *****/
//*****                                                 *****/
//***********************************************************/

   


const { getAllQuizWithAuthor, getQuizWithDetails } =require('./quiz');
const {User} = require('../models');
const validator = require("email-validator");
const bcrypt = require('bcrypt');
const saltRounds = 10; // permet de dire a quel point on veut que le mot de pass soit mélangé


const mainController = {

    async homePage(req, res) {
        console.log("==========================================>"+ JSON.stringify( req.session));
        const quizList = await getAllQuizWithAuthor();
        //console.log(getAllQuizWithAuthor);
        
        res.render('home',{quizList});
    },

    async quizPage(req, res){
        const quizId=req.params.id;
        const quiz= await getQuizWithDetails(quizId)

        res.render('quiz',{quiz});
    },

    signPage(req,res){
        
        res.render('signup');
        
    },

    login(req,res){
        res.render('login');
    },

    async signAction(req,res){
        try{
            const result=await User.findOne({
                where :{
                    email:req.body.email
                }
            })
            if(!result){
                throw new Error('Ce compte exite déjà');

            }
            //on verifie le format de l'email
            if(validator.validate(req.body.email)===false){
                throw new Error("Le format d'email est invalide");
            }
            if (req.body.password!==req.body.passwordConfirm){
                throw new Error("Le mot de pass est invalide");
            }
            // on utilise bcrypt, qui appel la méthode hash, dans laquelle on donne le mot de pass
            // et "le nombre de tour de mélange"
            const encryptedMsg=await bcrypt.hash(req.body.password, saltRounds);

            const newUser =await User.create(
                req.body.firstname, 
                req.body.lastname, 
                req.body.email, 
                req.body.password 
            );
            if(!result){
                throw new Error("erreur lors de l'inscription")
            }
            res.redirect('/login');

        }catch(err){
                console.log('Erreur ');
        }
        console.log( await User.findAll());
        

        console.log("test--->" +req.body.lastname);

    }
} 


module.exports = mainController;
