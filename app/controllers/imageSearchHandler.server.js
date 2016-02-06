'use strict';

var Urls = require('../models/urls.js');

function ImageSearchHandler () {
	
	this.getImages = function (req, res) {
		//console.log(req);
		res.json([{url: "testest"}, {url: "othertest"}]);
	};
}

module.exports = ImageSearchHandler;
