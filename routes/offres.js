const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');

// Load Offer Model
require('../models/Offre');
const Offre = mongoose.model('offres');

// Offer Index Page
router.get('/', ensureAuthenticated, (req, res) => {
    Offre.find({})
        .sort({date: 'desc'})
        .then(offres => {
            res.render('offres/index', {
                offres: offres
            })
        })
    
})

// Add Offer form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('offres/add');
})

// Process Add Offer Form
router.post('/', ensureAuthenticated, (req, res) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({text: 'Ajouter un titre!'});
    }
    if(!req.body.localisation) {
        errors.push({text: 'Ajouter une localisation!'});
    }

    if (errors.length > 0) {
        res.render('offres/add', {
            errors: errors,
            title: req.body.title,
            localisation: req.body.localisation 
        });
    } else {
        const newOffre = {
            title: req.body.title,
            category: req.body.category,
            localisation: req.body.localisation,
            user: req.user.id
        } 
        new Offre(newOffre)
            .save()
            .then(offre => {
                req.flash('success_msg', 'Nouvelle offre enregistree');
                res.redirect('/offres');
            })
    }
})

// Edit Offer Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Offre.findOne({
        _id: req.params.id
    })
        .then(offre => {
            res.render('offres/edit', {
                offre: offre
            });
        })
    
})

// Edit Form process
router.put('/:id', ensureAuthenticated, (req, res) => {
    Offre.findOne({
        _id: req.params.id
    })
        .then(offre => {
            // New values
            offre.title = req.body.title;
            offre.category = req.body.category;
            offre.localisation = req.body.localisation;

            offre.save()
                .then(offre => {
                    req.flash('success_msg', 'Offre modifiee!');
                    res.redirect('/offres');
                })
        })
})

// Delete Offer
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Offre.deleteOne({
        _id: req.params.id
    })
        .then(() => {
            req.flash('success_msg', 'Offre supprimee!');
            res.redirect('/offres');
        })
})

module.exports = router;