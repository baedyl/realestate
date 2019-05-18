const express = require('express');
const router = express.Router();

// About Index Page
router.get('/', (req, res) => {
    res.render('about/index');
})

module.exports = router;