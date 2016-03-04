'use strict';

var ImageSearchHandler = require(process.cwd() + '/app/controllers/imageSearchHandler.server.js');

module.exports = function (app, db) {
  
  var imageSearchHandler = new ImageSearchHandler(db);
  
  app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
    });
    
  app.route('/api/imageSearch/:searchTerm*')
    .get(imageSearchHandler.getImages);
    
  app.route('/api/latest/imagesearch')
    .get(imageSearchHandler.getHistory);
};
