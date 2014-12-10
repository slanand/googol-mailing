// Requires the application model
var mongo = require("../models/mymongo.js");
var userModel = require("../models/user.js");

// verifies login credentials and stores username and password in session storage
exports.login = function(req, res) {
   mongo.getAdmin(function(user) {
   		userModel.checkLogin(user, req.params.username, req.params.password, function(check) {
   			if (check == "Wrong admin") {
   				res.render('loginError');
   			} else {
               // set session username/password to login username/password
               req.session.username = req.params.username;
               req.session.password = req.params.password;
               console.log(req.session);
   				res.render('loginSuccessful');
   			}
	     });
   });
}

// view all lists created by the user
exports.viewLists = function(req, res) {
   mongo.getCollectionNames(function(collecs) {
      console.log(collecs);
      var collectionNames = [];
      for (var i = 0; i < collecs.length; i++) {
         var collecName = collecs[i].name.split(".");
         if ((collecName.length != 3) && (collecName[1] != "users") && 
            (collecName[1] != "null") && (collecName[1] != "openshift")) {
            collectionNames.push(collecName[1]);
         }
      }
      console.log(req.session);
   	res.render('mailLists', {lists: collectionNames});
   });
}

// view contacts within certain list on lists page
exports.viewContacts = function(req, res) {
   mongo.find(req.params.listname, req.query, function(contacts) {
      res.render('contacts',{title: 'Googol Mails', contactList: contacts});
   });
}

// display email form with dropdown of lists
exports.showForm = function(req ,res) {
   mongo.getCollectionNames(function(collecs) {
      var collectionNames = [];
      for (var i = 0; i < collecs.length; i++) {
         var collecName = collecs[i].name.split(".");
         if ((collecName.length != 3) && (collecName[1] != "users") && 
            (collecName[1] != "null") && (collecName[1] != "openshift")) {
            collectionNames.push(collecName[1]);
         }
      }
      res.render('emailForm', {lists: collectionNames});
   });
}