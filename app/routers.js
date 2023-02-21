//***********************************************************/
//*****                                                 *****/
//*****                  router.js                      *****/
//*****                                                 *****/
//***********************************************************/




const express = require('express');
const mainController = require('./controllers/mainController');

const router = express.Router();

router.get('/', mainController.homePage);
router.get('/quiz/:id', mainController.quizPage);

//affichage de la page de connection
router.get('/login',mainController.login);
router.get('/signup',mainController.signPage);
router.post('/signup',mainController.signAction);


module.exports = router;