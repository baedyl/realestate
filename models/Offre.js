const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OffreSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    category: {
        type: String,
        required: true
    },
    localisation: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('offres', OffreSchema);