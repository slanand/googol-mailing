var mongo = require("../models/mymongo.js");
var mailer = require("../models/mailer.js");

// send email
exports.send = function(req, res) {
   mongo.findList(req.params.list, function(listContacts) {
   		mailer.send(listContacts, req.params.subject, req.params.body, function(model) {
	   		res.render('success');
	   });
   });
}