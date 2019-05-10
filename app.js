const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Load Routes
const offres = require('./routes/offres');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

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

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Express Session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global Variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// About Route
app.get('/about', (req, res) => {
    res.send('about');
})

// Use Routes
app.use('/offres', offres);
app.use('/users', users);


const port = 7000 || 8000;
//const port = 8000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    
});