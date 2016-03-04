'use strict';

var Images = require('../models/images.js');
var https = require('https');

function ImageSearchHandler () {
	var displayItems = function(thing) {
		console.log(thing);
	}
	
	this.getImages = function (req, res) {
		// Establish the data to pass to Search API.
		var query = encodeURI(req.params.searchTerm);
		var offsetString = req.query.offset;
		var offset = parseInt(offsetString) || 0;
		var APIparams = { q: query, sop: 'Image', mkt: 'en-us' , lmt: 10, ost: offset};
		//Save Search Term to Mongo
		var complicated = new Date();
		var formattedDate = complicated.getFullYear() + "-" + complicated.getMonth() + "-" + complicated.getDate() + " " + complicated.getHours() + ":" + complicated.getMinutes() + ":" + complicated.getSeconds();
		var newImage = new Images({term: decodeURI(query), when: formattedDate});
		console.log(newImage);
    	newImage.save(function(err) {
  			if (err) throw err;
		});
		// Passing the query, service operation and market to API call.
		var finishedItems;
		var APIhost = "api.datamarket.azure.com";
		//Create the full API URL with query and settings
		var APIpath = encodeURI("/Bing/Search/"+APIparams.sop+"?$format=JSON&Query='")+APIparams.q+encodeURI("'&Market='"+APIparams.mkt+"'&$skip="+APIparams.ost+"&$top="+APIparams.lmt);
		var options = {
			hostname: APIhost, 
			path: APIpath,
			auth: ":o+qT6Od54nLrYTY8I0rUiTzxGbfXSTLpF5s5Dgewj8E"};
		var finalReturn = https.get(options, (response) => {
		  console.log(`Got response: ${response.statusCode}`);
		  // consume response body
		  response.on('data', (d) => {
		    var resultsArray = JSON.parse(d.toString()).d.results;
		    var returnedArray = [];
		    for (var i = 0; i < resultsArray.length; i++) {
		    	var imageData = resultsArray[i];
		    	var imageObject = {
		    		url: imageData.MediaUrl,
		    		snippet: imageData.Title,
		    		thumbnail: imageData.Thumbnail.MediaUrl,
		    		context: imageData.SourceUrl
		    	};
		    	returnedArray.push(imageObject);
		    }
		    res.json(returnedArray);
		  });
		}).on('error', (e) => {
		  console.log(`Got error: ${e.message}`);
		});
	};
	
	this.getHistory = function (req, res) {
		//res.json({test: "testest"});
		Images
			.find()
			.exec(function (err, result) {
				if (err) { 
					throw err;
				}
				console.log(result);
				var history = [];
				for (var i = 0; i < result.length; i++) {
					var complicated = result[i];
					var simplified = {
						term: complicated.term,
						when: complicated.when
					}
					history.push(simplified);
				}
				res.json(history);
			});
	};
}

module.exports = ImageSearchHandler;
