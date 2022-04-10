
let mongoose = require('mongoose');

// Create a model class
let surveyModel = mongoose.Schema(
    {
        Title: String,
        College: String,
        Program: String,
        Delivery: String,
        Complexity: String
    },
    {
        collection: "survey"
    }
);

module.exports = mongoose.model('Survey', surveyModel);