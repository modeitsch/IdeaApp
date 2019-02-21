const express = require('express')
const exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session')
const app = express()
const port = 3000
const mongoose = require('mongoose');


const ideas = require('./routes/ideas');

const users = require('./routes/users')



mongoose.connect('mongodb://localhost:27017/myapp',{})
.then(() => console.log('connected'))
.catch(err => console.log(err));






app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())
 //method over
 app.use(methodOverride('_method'))

 app.use(session({
     secret: 'secret',
     resave: true,
     saveUninitialized: true,

 }));
app.use(flash());

app.use(function(req,res,next){
    res.locals.good_msg = req.flash('good msg');
    res.locals.bad_msg = req.flash('bad msg')
    res.locals.bad = req.flash('bad')
next()
});

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => res.render('about'))

//add people
app.use('/ideas', ideas)

app.use('/users', users)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))