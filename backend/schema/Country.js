const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true,
    },
    flag: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Country', CountrySchema);