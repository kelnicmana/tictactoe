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

/// gameBoard module
let gameBoard = (function(){
    let board = new Array(9).fill(0);
    let player = playerOne.mark;
    
    const newBoard = () => {
        board.fill(0);
        player = playerOne.mark;
    }
    return {
        
        makeMove: (place) => {
            if (board[place] === 0) {
                board[place] = player;
                displayController.updateUI(place, player);
                console.log(board);
            
                let rows = [[board[0], board[1], board[2]], [board[3], board[4], board[5]], [board[6], board[7], board[8]]];
                let cols = [[board[0], board[3], board[6]], [board[1], board[4], board[7]], [board[2], board[5], board[8]]];
                let diag = [[board[0], board[4], board[8]], [board[2], board[4], board[6]]];
                let winCheck = [rows, cols, diag];
                for (i=0; i< winCheck.length; i++) {
                    for (j=0; j<winCheck[i].length; j++) {
                        if (winCheck[i][j][0] != 0 && winCheck[i][j][0] === winCheck[i][j][1] && winCheck[i][j][1] === winCheck[i][j][2]) {
                            displayController.winUI(player)
                            newBoard();
                            displayController.disableUI();
                            return console.log(`${player} wins!`)
                        }
                    }
                }
                const tieCheck = board.every(e => e != 0);
                if (tieCheck === true) {
                    displayController.tieUI();
                }
                if (player === playerOne.mark) player = playerTwo.mark;
                else player = playerOne.mark;
                document.querySelector('.header').textContent=`${player}'s turn.`
                console.log(`${player}'s turn.`);
            }
            return player;
        },
        getBoard: () => {
            return board;
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
        disableUI: () => {
            document.querySelector('.container').classList.add('disable');
        },
        newGame: () => {
            location.reload();
            return false;
        },
        updateUI: (dataKey, mark) => {
            document.querySelector(`[data-key="${dataKey}"]`).innerHTML = `${mark}`;
        },
        tieUI: () => {
            document.querySelector('.header').textContent = "It's a tie!";
        },
        winUI: (player) => {
            document.querySelector('.header').textContent = `${player} wins!`
        }
    }
})();