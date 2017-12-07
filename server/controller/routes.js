
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
	// console.log(req.body.title)
	// console.log(req.body.body)
	if(req.body.title !=='' && req.body.body !==''){
	
		var bulletinQuery = "INSERT INTO messages (title, body) VALUES ($1, $2)";
		pgClient.query(bulletinQuery, [req.body.title, req.body.body], function(error, queryRes){
			if(error){
				res.json(error)
			} else {
				res.json(queryRes)
				console.log(queryRes)
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

//shows all messages from my table in the web browser
router.get('/api/homepage', function(req, res){
	pgClient.query("SELECT * FROM messages", function(error,queryResTwo){
		if(error){
			res.json(error)
		} else {
			res.json(queryResTwo)
			//console.log(queryResTwo)
		}
	});
});

//Delete route so that when I x-out of a message it is removed.
router.delete('/api/delete-post/:id', function(req, res){
	pgClient.query("DELETE FROM messages WHERE id=" + req.params.id, function(err, res){
		if (err){
			console.log(error)
		}
	});
});

//Put route so that I can click on and update messages in a modal.

router.put('/api/update-post/:id', function(req, res){
	pgClient.query("UPDATE messages SET body=$1 WHERE id="+ req.params.id, [req.body.message] ,function(err,queryRes){
		if(err){
			res.json(err)
		} 
		console.log("updated successfully")
		res.json(queryRes)
	});
});




module.exports = router;