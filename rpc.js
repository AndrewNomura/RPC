"use strict"


let express = require("express");
let rpc = express();

// Needed to parse the request body
const bodyParser = require('body-parser'); 
rpc.use(bodyParser.urlencoded({ extended: true })); // supports URL encoded bodies


// Gets the index.html homepage
rpc.get('/', function(req, res) {
	console.log("Got a GET request for the homepage");
	res.sendFile('index.html' , {root: __dirname})
})

// This responds a POST request for the homepage
rpc.post('/play', function(req, res) {
	console.log("Got a POST request for the homepage");
	res.send("You selected "+ req.body.gameOptions);
})

// This ressponds a DELETE request for the /del_user page
rpc.delete('/del_user', function(req, res) {
	console.log("Got a DELETE request for /del_user");
	res.send("Hello DELETE");
})

// This responds a GET request for the /list_user page
rpc.get('/list_user', function(req, res) {
	console.log("Got a GET request for /list_user");
res.send("Page Listing");
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
rpc.get('/ab*cd', function(req, res) {
	console.log("Got a GET request for /ab*cd");
	res.send("Page Patern Match");
})


let server = rpc.listen(8081, function () {
	let host = server.address().address;
	let port = server.address().port;


	console.log("rpc listening at http://%s:%s", host, port);
});