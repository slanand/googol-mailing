var util = require("util");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var wellknown = require('nodemailer-wellknown');

//Setup Nodemailer transport
smtpTrans = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: {
      user: "m2cgoogol@gmail.com",
      pass: "viiohjizmdhqjxrg" 
  }
}));

// send mail 
exports.send = function(contacts, subject, text, callback) {
  for (var i = 0; i < contacts.length; i++) {
    mailOpts = createMail(contacts[i], subject, text);
    smtpTrans.sendMail(mailOpts, function(error, response) {
      if (error) {
        doError(error);
      }
      else {
        callback('Yay! Email sent!');
      }
    });
  }
}

// set up mail information
function createMail(contactInfo, subjectname, body) {
  editedMessage = replaceParams(body, contactInfo);
	mailOpts = {
      from: 'Joe User <m2cgoogol@gmail.com>', 
      to: contactInfo.email,
      subject: subjectname,
      html: editedMessage
  	};
  	return mailOpts;
}

// substitute params with user's first name / last name
function replaceParams(message, params) {
  console.log(message);
  var edited = message;
  if (typeof message === 'undefined') {
    edited = "This message has no content. Sorry!";
    return edited;
  }
  else if (message.indexOf("<<<firstname>>>") >= 0) {
    edited = edited.replace("<<<firstname>>>", params.firstname);
  }
  if (message.indexOf("<<<lastname>>>") >= 0) {
    edited = edited.replace("<<<lastname>>>", params.lastname);
  }
  console.log(edited);
  return edited;
}

var doError = function(e) {
    util.debug("ERROR: " + e);
    throw new Error(e);
}
