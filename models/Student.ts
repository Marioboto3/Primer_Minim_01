'use strict';
import mongoose = require("mongoose");

let student = mongoose.Schema({
    name: String,
    address: String,
    phones: [{
        description: String,
        number: String
    }],
    studies: [{
        studies: String
    }]
});

module.exports = mongoose.model('Student', student);
