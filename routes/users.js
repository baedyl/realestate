const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User Login Route
router.get('/login', (req, res) => {
    res.send('login');
})

// User Registration Route
router.get('/register', (req, res) => {
    res.send('Register');
})

module.exports = router;