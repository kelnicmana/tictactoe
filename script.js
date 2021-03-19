///players factory function
function Players(_name, _mark) {
    let name = _name;
    let mark = _mark;
    return {
        name: name,
        mark: mark
    };
};

const playerOne = Players('Player One', 'X');
const playerTwo = Players('Player Two', 'O');
let player;
let p2;

/// gameBoard module
let gameBoard = (function(){
    let board = new Array(9).fill(0);
    player = playerOne.mark;

    const newBoard = () => {
        board.fill(0);
        player = playerOne.mark;
    }

    return {
        
        makeMove: (place) => {
            displayController.enableUI();
            if (board[place] === 0) {
                board[place] = player;
                displayController.updateUI(place, player);
            
                let rows = [[board[0], board[1], board[2]], [board[3], board[4], board[5]], [board[6], board[7], board[8]]];
                let cols = [[board[0], board[3], board[6]], [board[1], board[4], board[7]], [board[2], board[5], board[8]]];
                let diag = [[board[0], board[4], board[8]], [board[2], board[4], board[6]]];
                let winCheck = [rows, cols, diag];
                for (i=0; i< winCheck.length; i++) {
                    for (j=0; j<winCheck[i].length; j++) {
                        if (winCheck[i][j][0] != 0 && winCheck[i][j][0] === winCheck[i][j][1] && winCheck[i][j][1] === winCheck[i][j][2]) {
                            displayController.disableUI();
                            return displayController.winUI(player);
                        }
                    }
                }
                const tieCheck = board.every(e => e != 0);
                if (tieCheck === true) {
                    displayController.tieUI();
                }
                else {
                    if (player === playerOne.mark) {
                        
                        player = playerTwo.mark;
                        if (p2 === 'ai') {
                        logicAI();
                        };
                    }
                    else {player = playerOne.mark;}
                    document.querySelector('.header').textContent=`${player}'s turn.`
                }
            }
            return player;
        },
        getBoard: () => {
            return board;
        },
        setBoard: (_board) => {
            board = _board;
        }
    }
})();

/// displayController module
const displayController = (function() {
    document.querySelector('.container').addEventListener('click', (e) => {
        if (e.target.classList.contains('spot')) {
            let index = e.target.getAttribute('data-key');
            gameBoard.makeMove(index);
        }
    });
    return {
        newUI: () => {
            const spots = Array.from(document.querySelectorAll('.spot'));
            spots.forEach(e => e.innerHTML = '');
        },
        enableUI: () => {
            document.querySelector('.container').classList.remove('disable');
        },
        disableUI: () => {
            document.querySelector('.container').classList.add('disable');
        },
        newGame: (_p2) => {
            document.querySelector('.container').classList.remove('disable');
            let board = new Array(9).fill(0);
            gameBoard.setBoard(board);
            const spots = Array.from(document.querySelectorAll('.spot'));
            spots.forEach(e => e.innerHTML = '');
            document.querySelector('.header').textContent = 'Tic Tac Toe';
            player = playerOne.mark;
            p2 = _p2;
        },
        updateUI: (dataKey, mark) => {
            document.querySelector(`[data-key="${dataKey}"]`).innerHTML = `${mark}`;
        },
        tieUI: () => {
            document.querySelector('.header').textContent = "It's a tie!";
        },
        winUI: (_player) => {
            document.querySelector('.header').innerHTML = `${_player} wins!`
        }
    }
})();

/// working on the AI logic now
/// first a filter function that updates an array with the possible index values still available to be used in the gameboard.
const logicAI = function() {
    let board = gameBoard.getBoard();
    let arrAImoves = [];
    board.filter((e, i) => {
        if (e === 0) {
            arrAImoves.push(i);
        };
    });
    displayController.disableUI();
    setTimeout(() => gameBoard.makeMove(arrAImoves[Math.floor(Math.random() * arrAImoves.length)]), 500);
};