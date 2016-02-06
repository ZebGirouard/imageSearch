'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
	    url: String,
	    snippet: String,
	    thumbnail: String,
	    context: String,
	    id: String
});

module.exports = mongoose.model('Image', Image);
