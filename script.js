/// displayController module
const displayController = function(move) {
    document.querySelector(move).innerHTML = `${players.marker}`
}

/// gameBoard module
let gameBoard = (function(){
    let board = new Array(9);
    let marker = 'x';
    let divOne = document.querySelector(".one");
    let divTwo = document.querySelector(".two");

    divOne.addEventListener('click', () => {
        makeMove(0, marker);
    })
    divTwo.addEventListener('click', () => {
        makeMove(1, marker);
    })
    
    
    function makeMove(place, mark) {
        if (board[place] === undefined) {
            board[place] = mark;
            console.log(board);
            if (marker === 'x') marker = 'o';
            else marker = 'x';
        }
    }
    console.log(board);
})();

/// players factory function
const Players = function(name, marker) {
    this.name = name;
    this.marker = marker;
}