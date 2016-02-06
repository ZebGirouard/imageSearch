'use strict';

var Urls = require('../models/urls.js');

function URLShortHandler () {
	
	this.getURL = function (req, res) {
		var rawURL = req.url;
		var baseURL = req.get('Host');
		var myRegEx = /new\/(.*)/;
		var originalURL = myRegEx.exec(rawURL)[1];
	    var isURL = function (string) {
		  var pattern = /^http|https:\/\/.+\..+/
		  return pattern.test(string);
		}
		if (isURL(originalURL)) {
			Urls.count({}, function( err, count){
				if (err) throw err;
				var newURL = new Urls({originalUrl: originalURL, id: count});
    			newURL.save(function(err) {
  					if (err) throw err;
				});
				res.json({original_url: originalURL, short_url: "https://"+baseURL+"/"+count});
			});
		}
		else {
		    res.json({error:"URL invalid"});
		}
	};
	this.redirectURL = function (req, res) {
		var linkID = req.params.id
		Urls.findOne({"id": linkID}, function (err, response) {
			if (err) res.json({error:"No short url found for given input"});
			if (!response) {
				res.json({error:"No short url found for given input"});
			}
			else {
				res.redirect(response.originalUrl);				
			}
		})
	}
}

module.exports = URLShortHandler;
