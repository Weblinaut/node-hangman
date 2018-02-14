
var inquirer = require('inquirer');
var isLetter = require('is-letter');

var Word = require('./word.js');
var Game = require('./puzzle.js');

require('events').EventEmitter.prototype._maxListeners = 100;

var hangman = {
    wordBank: Game.newWord.wordList,
    guessesRemaining: 10,
    guessedLetters: [],
    display: 0,
    currentWord: null,
    startGame: function() {
        let that = this;
        if(this.guessedLetters.length > 0){
            this.guessedLetters = [];
        }

        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Play Game"
        }]).then(function(answer) {
            if(answer.play){
                that.initGame();
            } else{
                console.log("Sadly, that's all I do");
            }
        })},

    initGame: function() {
        if(this.guessesRemaining === 10) {
            console.log("***GAME BEGIN***");
            console.log('****************');
            //generates random number based on the wordBank
            var num = Math.floor(Math.random()*this.wordBank.length);
            this.currentWord = new Word(this.wordBank[num]);
            console.log(this.currentWord.renderWord());
            this.askUser();
        } else{
            this.resetGuessesRemaining();
            this.initGame();
        }
    },
    resetGuessesRemaining: function() {
        this.guessesRemaining = 10;
    },
    askUser : function(){
        let that = this;
        inquirer.prompt([{
            name: "chosenLtr",
            type: "input",
            message: "Choose a letter:",
            validate: isLetter

        }]).then(function(letter) {
            let letterReturned = (letter.chosenLtr).toUpperCase();
            let guessedAlready = false;
            for(let i = 0; i<that.guessedLetters.length; i++){
                if(letterReturned === that.guessedLetters[i]){
                    guessedAlready = true;
                }
            }
            if(!guessedAlready){
                that.guessedLetters.push(letterReturned);
                let found = that.currentWord.checkIfLetterFound(letterReturned);
                if(found === 0){
                    console.log('Nope! You guessed wrong.');
                    that.guessesRemaining--;
                    that.display++;
                    console.log('Guesses remaining: ' + that.guessesRemaining);


                    console.log('\n*******************');
                    console.log(that.currentWord.renderWord());
                    console.log('\n*******************');

                    console.log("Letters guessed: " + that.guessedLetters);
                } else{
                    console.log('Yes! You guessed right!');
                    //checks to see if user won
                    if(that.currentWord.wasWordFound()){
                        console.log(that.currentWord.renderWord());
                        console.log('Congratulations! You won the game!!!');
                        // that.startGame();
                    } else{
                        // display the user how many guesses remaining
                        console.log('Guesses remaining: ' + that.guessesRemaining);
                        console.log(that.currentWord.renderWord());
                        console.log('\n*******************');
                        console.log("Letters guessed: " + that.guessedLetters);
                    }
                }
                if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
                    that.askUser();
                }else if(that.guessesRemaining === 0){
                    console.log('Game over!');
                    console.log('The word you were guessing was: ' + that.currentWord.word);
                }
            } else{
                console.log("You've guessed that letter already. Try again.")
                that.askUser();
            }
        });
    }
}

hangman.startGame();