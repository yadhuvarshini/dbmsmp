var mysql = require('mysql');

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var mysql = require('mysql');
const session = require('express-session');
const path = require('path');


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database :"dbms_mp"
});


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


connection.connect(function(err) {
  if(err){
    console.log("Error in the connection")
    console.log(err)
  }
  else{
    console.log(`Database Connected`)
    
    function func(err, result) {
      if(err)
        console.log(`Error executing the query - ${err}`)
      else
        console.log("Result: ",result) 
    }
  }
})


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass ;
  console.log(`POST req: email is ${email} and pass is ${pass}`);
  
  if (email && pass) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		  connection.query('SELECT * FROM mp WHERE email = ? AND pass = ?', [email, pass], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
       console.log("connected")			
       req.session.loggedin = true;
			 req.session.email = email;
       	// Redirect to home page
       res.redirect('/');
       console.log("connected3")	
			} else {
        console.log("Incorrect email and/or Password!")
				res.send('Incorrect email and/or Password!');
			}			
			res.end();        
		});
	} else {
		res.send('Please enter email and Password!');
		res.end();
	}

});

app.get('/', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.email + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});



app.listen(4000, () => {
  console.log("Started on http://localhost:4000");
});