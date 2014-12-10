// Requires the mongodb model
var mongo = require("../models/mymongo.js");

// add a contact
exports.insert = function(req, res) {
    mongo.insert(req.params.list, req.query, function(model) {
        mongo.findList(req.params.list, function(model){
          res.render('mongo', {title: 'Googol Mails', obj: model, list: req.params.list});
        })
	  });
}

// find a contact
exports.find = function (req, res) { 
	mongo.find(req.params.list, req.query, function(model) {
    	res.render('mongo',{title: 'Googol Mails', obj: model});
	});
}

// update a contact within a list
exports.update = function(req, res) { 
	mongo.update(req.params.list, req.params.currEmail, req.query, function(model) {
        res.render('editSuccess',{title: 'Googol Mails', obj: "Successful update."});
    });
}

// delete a contact within a list
exports.delete = function(req, res) {
	mongo.delete(req.params.list, req.query, function(model) {
        res.render('editSuccess',{title: 'Googol Mails', obj: "Successful deletion."});
    });
}

// In the case that no route has been matched
exports.errorMessage = function(req, res){
  var message = '<p>Error, did not understand path '+req.path+"</p>";
	// Set the status to 404 not found, and render a message to the user.
  res.status(404).send(message);
};

