'use strict';

var URLShortHandler = require(process.cwd() + '/app/controllers/urlShortHandler.server.js');

module.exports = function (app, db) {
  
  var urlShortHandler = new URLShortHandler(db);
  
  app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
    });
    
  app.route('/new/:anything*')
    .get(urlShortHandler.getURL);
    
  app.route('/:id')
    .get(urlShortHandler.redirectURL);
};
