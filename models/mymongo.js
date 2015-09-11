var util = require("util");
var mongoClient = require('mongodb').MongoClient;
/*
 * This is the connection URL
 * Give the IP Address / Domain Name (else localhost)
 * The typical mongodb port is 27012
 * The path part (here "m2clists") is the name of the database
 */


// default to a 'localhost' configuration:
var connection_string = "localhost:27017/m2clists";
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
var mongoDB; // The connected database
// Use connect method to connect to the Server
mongoClient.connect("mongodb://" + connection_string, function(err, db) {
  if (err) doError(err);
  console.log("Connected correctly to server");
  mongoDB = db;
});


/* 
 * In the methods below, notice the use of a callback argument,
 * how that callback function is called, and the argument it is given.
 * Why can't the insert, find, and update functions just return the
 * data directly?
 */


// INSERT contact within list (collection)
exports.insert = function(collection, query, callback) {
      mongoDB.collection(collection).insert(
        query,
        {safe: true},
        function(err, crsr) {
          if (err) doError(err);
          callback(crsr);
        });
}

// FIND contact within list (collection)
exports.find = function(collection, query, callback) {
    // if query string is empty then display all contacts in list (collection)
    if (query == " ") {
      var crsr = mongoDB.collection(collection).find();
      crsr.toArray(function(err, docs) {
          if (err) doError(err);
          callback(docs);
      });
    }
    // otherwise find the contact within the list
    else {
      var crsr = mongoDB.collection(collection).find(query);
      crsr.toArray(function(err, docs) {
        if (err) doError(err);
        callback(docs);
      });
    }
}

// FIND admin in database
exports.getAdmin = function (callback) {
  var crsr = mongoDB.collection("users").find({username: "joeuser"});
  crsr.toArray(function(err, doc) {
      if (err) doError(err);
      callback(doc);
  });
}

// get documents of certain collection
exports.findList = function(collection, callback) {
	var crsr = mongoDB.collection(collection).find();
	  crsr.toArray(function(err, docs) {
	    if (err) doError(err);
	    callback(docs);
	  });
}

// UPDATE contact within list (collection)
exports.update = function(collection, currEmail, query, callback) {
  mongoDB.collection(collection).update(
      {email: currEmail},
      query, {
      }, function(err, crsr) {
        if (err) doError(err);
        callback('Update succeeded');
  });
}

// DELETE contact within list (collection)
exports.delete = function(collection, query, callback) {
  mongoDB.collection(collection).remove(
    query, {
      justOne: true
    }, function(err, crsr) {
      if (err) doError(err);
      callback('Successful deletion');
  });
}

// get names of existing collections
exports.getCollectionNames = function(callback) {
  mongoDB.collectionNames(function(err, names) {
    if (err) doError(err);
    callback(names);
  });
}

var doError = function(e) {
  util.debug("ERROR: " + e);
  throw new Error(e);
}
