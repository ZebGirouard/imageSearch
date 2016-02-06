'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
	    originalUrl: String,
	    id: String
});

module.exports = mongoose.model('Url', Url);
