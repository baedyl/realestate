const express = require('express');
const router = express.Router();
//const {ensureAuthenticated} = require('../helpers/auth');

// Contact Index Page
/*router.get('/', ensureAuthenticated, (req, res) => {
    res.render('contact/index');
})*/

// Contact Index Page
router.get('/', (req, res) => {
    res.render('contact/index');
})

module.exports = router;