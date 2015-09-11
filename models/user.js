// check if login username (case insensitive) and password (case sensitive) are equal to username 
// and password of user in database
exports.checkLogin = function(user, username, password, callback) {
	console.log("checklogin: user: ", user, " username: ", username, " password: ", password);
	if ((user[0].username == username) && (user[0].password === password)) {
		callback("okay");
	}
	else {
		callback("Wrong admin");
	}
}