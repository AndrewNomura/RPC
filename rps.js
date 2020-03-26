"use strict"


let express = require("express");

function RPS(port) {

	const app = express();
	app.myRPS = this;

	let server = app.listen(port, function () {
		let host = server.address().address;
		let port = server.address().port;

		console.log("rps listening at http://%s:%s", host, port);
	});

	// Needed to parse the request body
	const bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true })); // supports URL encoded bodies

	// Set ejs as the template engine
	app.set("view engine", "ejs");

	// RPS Class Variables
	app.myRPS.serverChoice = null;
	app.myRPS.playerChoice = null;
	app.myRPS.playerWins = 0;
	app.myRPS.serverWins = 0;
	app.myRPS.playerWon = false;
	app.myRPS.serverWon = false;
	app.myRPS.gameCount = 0;


	//	Routing

	// Gets the index.html homepage with a GET request
	app.get('/', function (req, res) {
		res.sendFile('index.html', { root: __dirname })
	})

	// This responds a POST request for the homepage
	app.post('/play', function (req, res) {

		// Implement game logic here
		app.myRPS.setServerChoice();
		app.myRPS.compareHands(req.body.gameOptions);

		if(app.myRPS.playerWon)
		{
			// If win
			res.render("win", {
				playerChoice: app.myRPS.playerChoice, serverChoice: app.myRPS.serverChoice,
				playerWins: app.myRPS.playerWins, serverWins: app.myRPS.serverWins, gameCount: app.myRPS.gameCount
			});

		}
		else if(app.myRPS.serverWon){
			// If lose
			res.render("lose", {
				playerChoice: app.myRPS.playerChoice, serverChoice: app.myRPS.serverChoice,
				playerWins: app.myRPS.playerWins, serverWins: app.myRPS.serverWins, gameCount: app.myRPS.gameCount
			});
		}
		else if(!app.myRPS.serverWon && !app.myRPS.playerWon)
		{
			// If tie
			res.render("tie", {
				playerChoice: app.myRPS.playerChoice, serverChoice: app.myRPS.serverChoice,
				playerWins: app.myRPS.playerWins, serverWins: app.myRPS.serverWins, gameCount: app.myRPS.gameCount
			});
		}
	})
}

RPS.prototype.setServerChoice = function () {
	const serverOptions = ['Rock', 'Paper', 'Scissors'];
	let choiceIndex = Math.floor((Math.random() * 3));
	this.serverChoice = serverOptions[choiceIndex];
}

RPS.prototype.compareHands = function (playersChoice) {
	this.playerChoice = playersChoice;
	this.gameCount++;
	
	//check for a tie
	if (this.playerChoice === this.serverChoice) {
		this.serverWon = false;
		this.playerWon = false;
		return;
	}
	//check for rock
	if (this.playerChoice === 'Rock') {
		if (this.serverChoice === 'Scissors') {
			this.serverWon = false;
			this.playerWon = true;
			this.playerWins++;
			return;
		}
		else {
			this.serverWon = true;
			this.playerWon = false;
			this.serverWins++;
			return;
		}
	}
	//check for paper
	if (this.playerChoice === 'Paper') {
		if (this.serverChoice === 'Rock') {
			this.serverWon = false;
			this.playerWon = true;
			this.playerWins++;
			return;
		}
		else {
			this.serverWon = true;
			this.playerWon = false;
			this.serverWins++;
			return;
		}
	}
	//check for scissors
	if (this.playerChoice === 'Scissors') {
		if (this.serverChoice === 'Paper') {
			this.playerWon = true;
			this.serverWon = false;
			this.playerWins++;
			return;
		}
		else {
			this.serverWon = true;
			this.playerWon = false;
			this.serverWins++;
			return;
		}
	}
}

let rps = new RPS(8081)
