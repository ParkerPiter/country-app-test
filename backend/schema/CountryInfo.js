const mongoose = require('mongoose');

const PopulationCountSchema = new mongoose.Schema({
    year: Number,
    value: Number
});

const Borders = new mongoose.Schema({
    commonName: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
});

const CountryInfoSchema = new mongoose.Schema({
    countryCode: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true
    },
    borders: [Borders],
    populationCounts: [PopulationCountSchema],
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    }
});

module.exports = mongoose.model('CountryInfo', CountryInfoSchema);