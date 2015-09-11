Googol Mailing
=============

Final Project for 67-328 Mobile to Cloud: Building Distributed Applications (Carnegie Mellon University)

Googol Mailing provides users with an intuitive user interface that enables them to send personalized messages to several people. Mail Merge for Gmail allows people to send personalized mass emails but setting up the inputs and list of people needs to be done through an Excel spreadsheet or Google sheet, which can be troublesome and/or time-consuming. 

## Setup
I used the [Nodemailer](https://www.npmjs.com/package/nodemailer) npm module to send emails through this application. Nodemailer requires that the email and ‘application-specific password’ be hard coded into the code of the application in order to be authorized to send emails from a user’s Gmail account. I created a fake Gmail account, m2cgoogol@gmail.com, under the name Joe User, enabled 2-step authentication for the account and acquired the application-specific password to use and demonstrate this application. 

## Usage
Step-by-step use of the application:

1. `npm install` dependencies
2. Log on to Googol Mailing using username (joeuser) and password (m2c123)
3. Create lists of people you would like to send emails to; a list consists of a person’s first name, last name, and email address. 
4. After creating a list(s), compose an email and select the list you would like to use for that email from a dropdown of the lists you have created.
5. Compose the message using inputs within <<< >>> tags to indicate where the input should be substituted. 
	```
	Hi <<<firstname>>> <<<lastname>>>,
		I would like to personally invite you to my birthday party this weekend. Hope you can make it!
	Best,
	Joe User
	```
6. Hit the ‘send’ button and you’ve just sent a mass email ‘personally’ through the Googol Mails app!

