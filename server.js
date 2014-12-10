var express = require('express');
var dbRoutes = require('./routes/dbRoutes'); 
var emailRoutes = require('./routes/emailRoutes');
var morgan = require('morgan');
var app = express();
var session = require('express-session');
var userRoutes = require('./routes/userRoutes');

// Log requests
app.use(morgan('dev')); 

// Set the views directory
app.set('views', __dirname + '/views');

// Define the view (templating) ;engine
app.set('view engine', 'ejs');

// Handle static files
app.use(express.static(__dirname + '/public'));

// set up express-session information
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

// view lists 
app.get('/mylists', userRoutes.viewLists);

// get contacts within form
app.get('/lists/:listname', userRoutes.viewContacts)

// show email form
app.get('/email.html/form', userRoutes.showForm);

// send email
app.post('/email/:list/:subject/:body', emailRoutes.send);

// login 
app.post('/login/:username/:password', userRoutes.login);

// logout - destroy session redirect to login page
app.get('/logout/',function(req,res){
	req.session.destroy(function(err){
		if (err) {
			console.log(err);
		}
		else{
			res.redirect('/');
		}
	});
});

// create list / add contact to list
app.put('/m2clists/:list', dbRoutes.insert);

// if optional email parameter is given, retrieve specified contact, 
// otherwise retrieve entire collection
app.get('/m2clists/:list', dbRoutes.find);

// update contact in list
app.post('/m2clists/:list/:currEmail', dbRoutes.update);

// delete contact in list
app.delete('/m2clists/:list', dbRoutes.delete);

// Catch any routes not already handed with an error message
app.use(dbRoutes.errorMessage);

/*
 * OpenShift will provide environment variables indicating the IP 
 * address and PORT to use.  If those variables are not available
 * (e.g. when you are testing the application on your laptop) then
 * use default values of localhost (127.0.0.1) and 33333 (arbitrary).
 */

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 50000;

//  Start listening on the specific IP and PORT
app.listen(port, ipaddress, function() {
  console.log('%s: Node server started on %s:%d ...',
               Date(Date.now() ), ipaddress, port);
});