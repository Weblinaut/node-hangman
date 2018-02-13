var Letter = function(ltr) {
    this.letter = ltr;
    this.appear = false;
    this.letterRender = function() {
        if(this.letter == ' '){
            this.appear = true;
            return '  ';
        }
        if(this.appear){
        return this.letter;
        }

        return ' * ';



    };
};
module.exports = Letter;

