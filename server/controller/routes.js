
//node modules to request
var pg = require('pg');

//you have to pick the database to connect to;
var dbUrl = {
	user: process.argv.POSTGRES_USER,
	password: process.argv.POSTGRES_PASSWORD,
	database: 'bulletinboard',
	host: 'localhost',
	port: 5432
};

//creating a client to connect to, which as you see, uses the object that we set up
var pgClient = new pg.Client(dbUrl);
//officially connecting to that postgres database
pgClient.connect();

/* <------------------------------------------------------------------> */

var express = require('express');
var path = require('path');

var router = express.Router();

//var html_creator = require('../helpers/html_creator.js');

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.post('/api/bulletins', function(req, res){
	if(req.body.title !=='' && req.body.body !==''){
		var bulletinQuery = 'INSERT INTO bulletinboard (title, body), VALUES ($1, $2)';
		pgClient.query(bulletinQuery, [req.body.title, req.body.body], function(error, queryRes){
			if(error){
				res.json(error)
			} else {
				res.json(queryRes)
				console.log(req.body)
			}
		});
	} else if (req.body.title =='' && req.body.body !==''){
		res.json("null")
		console.log('please add a title')
	} else if (req.body.title !=='' && req.body.body ==''){
		res.json("null")
		console.log('please add a message')
	} else if (req.body.title =='' && req.body.body ==''){
		res.json("null")
		console.log('Please type a title and message')
	}
});


router.get('/api/homepage', function(req, res){
	pgClient.query("SELECT * FROM bulletinboard", (error,queryResTwo)=>{
		if(error){
			res.json(error)
		} else {
			res.json(queryResTwo)
			console.log(queryResTwo)
		}
	});
});







module.exports = router;