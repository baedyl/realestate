const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();

// Load Routes
const offres = require('./routes/offres');
const users = require('./routes/users');

// Connect to mongoose
mongoose.connect('mongodb://localhost/realestate-dev',  {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Index Route
app.get('/', (req, res) => {
    const title = "Welcome!";
    console.log(req.name);
    res.render('index', {
        title: title
    });
});

// Method override middleware
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

app.use(flash());

// Global Variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next();
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
})

// Use Routes
app.use('/offres', offres);
app.use('/users', users);


const port = 7000 || 8000;
//const port = 8000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    
});