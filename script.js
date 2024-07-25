const gameboard = (() => {
    const board = [];

    for(let i = 0; i < 9; i++) {
        board[i] = '';
    }

    const getBoard = () => board;

    const placeMark = (move, player) => {
        getBoard()[move] = player;
    }

    return { getBoard, placeMark };
})();

function Game(
    playerOne = 'Player One',
    playerTwo = 'Player Two'
) {
    players = [
        {
            name: playerOne,
            token: 'x'
        },
        {
            name: playerTwo,
            token: 'o'
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

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

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameboard.getBoard()[index] === getActivePlayer().token;
            });
        });
    }

    const playRound = () => {
        console.log(`${getActivePlayer().name}'s turn`);

        let move = prompt('in which cell do you want to play?');

        gameboard.placeMark(parseInt(move), getActivePlayer().token);

        console.log(gameboard.getBoard());

        if(checkWin()) {
            console.log(`${getActivePlayer().name} wins!`);
        }

        switchPlayer();
    };

    return { getActivePlayer, playRound };
}

const game = Game();