var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
//var mysql = require('mysql')
var app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(flash());

/*
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database :"dbms_mp"
});


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
 

*/
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send("Welcome")
	res.end()
});

app.post('/login', async (req, res) => {
  var email = req.body.email;
  var pass = req.body.pass ;
  console.log(`POST req: email is ${email} and pass is ${pass}`);
  
 /* if (email && pass) {
		    connection.query('SELECT * FROM mp WHERE email = ? AND pass = ?', [email,pass], function(err, results) {
			if (err) throw err;
			req.flash('success', 'Data added successfully!');
    		res.redirect('http://localhost:4000/login');
		  });
		}*/
    //res.send("Addition - ");
    // res.writeHead(200, {'Content-Type': 'text/html'})
  //res.end('thanks')

     res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ loginsuccess: 1 , name: 'Dr.Strange'}));

  });
	
  app.use(function(req, res, next) {
	next(createError(404));
  });

  app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.json({ error: err });
  });

app.listen(4000, () => {
  console.log("Started on http://localhost:4000");
});
