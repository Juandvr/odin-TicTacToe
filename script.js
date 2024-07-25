const gameboard = (() => {
    let board = [];

    for(let i = 0; i < 9; i++) {
        board[i] = '';
    }

    const getBoard = () => board;

    const setBoard = (newBoard) => {
        board = newBoard;
    }

    const placeMark = (move, player) => {
        getBoard()[move] = player;
    }

    return { getBoard, placeMark, setBoard };
})();

function Game(
    playerOne = 'Player One',
    playerTwo = 'Player Two'
) {
    players = [
        {
            name: playerOne,
            token: 'X'
        },
        {
            name: playerTwo,
            token: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const setActivePlayer = () => {
        activePlayer = players[0];
    }

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = () => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameboard.getBoard()[index] === getActivePlayer().token;
            });
        });
    }

    const playRound = (move) => {
        console.log(`${getActivePlayer().name}'s turn`);

        gameboard.placeMark(move, getActivePlayer().token);

        console.log(gameboard.getBoard());

        if(checkWin()) {
            console.log(`${getActivePlayer().name} wins!`);
        }
    };

    return { getActivePlayer, playRound, checkWin, setActivePlayer, switchPlayer };
}

function displayGame() {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let gameActive = true;

    const game = Game();

    cells.forEach(cell => cell.addEventListener('click', (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if(!gameActive) {
            return;
        }

        game.playRound(clickedCellIndex);
        clickedCell.textContent = game.getActivePlayer().token;

        if(game.checkWin()) {
            status.textContent = `${game.getActivePlayer().name} wins!`;
            gameActive = false;
            return;
        }
        
        game.switchPlayer();

        status.textContent = `${game.getActivePlayer().name}'s turn`;
    }))

    resetButton.addEventListener('click', () => {
            gameboard.setBoard(["", "", "", "", "", "", "", "", ""]);
            gameActive = true;
            game.setActivePlayer();
            status.textContent = '';
            cells.forEach(cell => cell.textContent = '');
    })
}

displayGame();