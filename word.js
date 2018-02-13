var Letter = require('./letter.js');
function Word(word) {
    let that = this;
    this.word = word;
    this.letters = word.split("").map(function(string) {
        return new Letter(string)
    })
    this.wordFound = false;
    this.wasWordFound = function() {
        if(this.letters.every(function(letter){
                return letter.appear
            })){
            this.wordFound = true;
            return true;
        }

    };
    this.checkIfLetterFound = function(guessedLetter) {
        let whatToReturn = 0;
        this.letters.forEach(function(letter){
            if(letter.letter === guessedLetter){
                letter.appear = true;
                whatToReturn++;
            }
        })
        return whatToReturn;
    };
    this.renderWord = function() {
        return that.letters.map(function(letter){
            return letter.letterRender()
        }).join("  ");

    };
}

module.exports = Word;