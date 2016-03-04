'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
	    term: String,
	    when: String
});

module.exports = mongoose.model('Image', Image);
