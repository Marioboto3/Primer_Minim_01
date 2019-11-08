'use strict';
import mongoose = require("mongoose");

let subject =mongoose.Schema({
    name: String,
    students: [{type: mongoose.Types.ObjectId, ref: 'Student'}]
});

module.exports = mongoose.model('Subject', subject);
