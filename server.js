// server.js
// loads the things we need

"use strict"

let express = require('express');
let connect = require('connect');
let serveStatic = require('serve-static');
let rpc = express();


connect().use(serveStatic(__dirname)).listen(8081, function() {
	console.log('Server running on 8081...');
});

//set the view engine to ejs
rpc.set('view engine', 'ejs');


// index page
rpc.get('/', function(req, res) {
	res.render('pages/index');
})

// about page
rpc.get('/about', function(req, res) {
	res.render('pages/about');
});

rpc.listen(3000);
