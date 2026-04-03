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
        if (board[move] === '') {
            getBoard()[move] = player;
        }
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

    const checkTie = () => {
        return gameboard.getBoard().every(cell => cell !== '');
    }

    const playRound = (move) => {
        console.log(`${getActivePlayer().name}'s turn`);

        gameboard.placeMark(move, getActivePlayer().token);

        console.log(gameboard.getBoard());

        if(checkWin()) {
            console.log(`${getActivePlayer().name} wins!`);
        }
    };

    return { getActivePlayer, playRound, checkWin, checkTie, setActivePlayer, switchPlayer };
}

function displayGame(p1, p2) {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let gameActive = true;

    const game = Game(p1, p2);

    cells.forEach(cell => cell.addEventListener('click', (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if(!gameActive) {
            return;
        }

        if(gameboard.getBoard()[clickedCellIndex] === '') {
            game.playRound(clickedCellIndex);
            clickedCell.textContent = game.getActivePlayer().token;
        } else {
            status.textContent = `Cell already occupied! Choose another cell.`;
            return;
        }

        if(game.checkWin()) {
            status.textContent = `${game.getActivePlayer().name} wins!`;
            gameActive = false;
            return;
        }

        if(game.checkTie()) {
            status.textContent = `It's a tie!`;
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

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener('click', () => {
    const playerOneName = document.getElementById("player1Name").value;
    const playerTwoName = document.getElementById("player2Name").value;

    console.log(`P1: ${playerOneName} P2: ${playerTwoName}`);

    const startScreen = document.getElementById("start-screen");
    startScreen.style.display = "none";

    const game = document.getElementById("game");
    game.style.display = "grid";

    displayGame(playerOneName, playerTwoName);
})