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
	game();
})


const game = () =>{
	let playerScore = 0;
	let computerScore = 0;


	// Start the game
	const startGame = () =>{
		const playBtn = function(){
			document.getElementById("Play!").click(); 
			const playerChoice = document.querySelectorAll('.gameOptions radio');
			const computerOptions = ['rock', 'paper', 'scissors'];

			gameOptions.forEach(computerOptions=>{
				// Computer choice
				gameOptions.addEventListener('click', function(){
					const computerNumber = Math.floor(Math.random() * 3);
					const computerChoice = computerOptions[computerNumber];

					//Here is where we call compareHands;
					compareHands(this.textContent, computerChoice);
				});
			});

			
			
		};

		const updateScore = () => {
			const playerScore = document.querySelector('.playerScore p');
			const computerScore = document.querySelector('.computerScore p');
			playerScore.textContent = playerScore;
			computerScore.textContent = computerScore;
		}

		const compareHands = (playerChoice, computerChoice) =>{
			//Update text
			const winner = document.querySelector('.winner');
			//check for a tie
			if(playerChoice === computerChoice){
				winner.textContent = "It is a tie";
				return;
			}
			//check for rock
			if(playerChoice === 'rock'){
				if(computerChoice === 'scissors'){
					winner.textContent = 'Player Wins!';
					playerScore++;
					updateScore();
					return;
				}
				else{
					winner.textContent = 'Computer Wins!';
					computerScore++;
					updateScore();
					return;
				}
			}
			//check for paper
			if(playerChoice === 'paper'){
				if(computerChoice === 'rock'){
					winner.textContent = 'Player Wins!';
					playerScore++;
					updateScore();
					return;
				}
				else{
					winner.textContent = 'Computer Wins!';
					computerScore++;
					updateScore();
					return;
				}
			}
			//check for scissors
			if(playerChoice === 'scissors'){
				if(computerChoice === 'paper'){
					winner.textContent = 'Player Wins!';
					playerScore++;
					updateScore();
					return;
				}
				else {
					winner.textContent = 'Computer Wins!';
					computerScore++;
					updateScore();
					return;
				}
			}

		}
	};


	startGame();
};

	// start the game
	game();





let server = rpc.listen(8081, function () {
	let host = server.address().address;
	let port = server.address().port;


	console.log("rpc listening at http://%s:%s", host, port);
});


