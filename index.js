require('dotenv').config();

const path = require('path');
const express = require('express');
const router = require('./app/routers');

const port = process.env.PORT || 3000;

const app = express();

const session = require('express-session');


app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', './app/views');


app.use(session({
   name : process.env.SESSION_NAME,
   resave : false,
   saveUninitialised : false,
   secret : process.env.SESSION_SECRET,
   cookie : {
      maxAge : 1000 * 60 *60 *24 *7,
      secure : false,
   }
}));

app.use(express.static(path.join(__dirname, './assets')))

app.use(router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});