const displayController = (() => {    
    const resetBtn = document.querySelector('.reset');
    const spaces = document.querySelectorAll('.space');
    let turn = 0 
    let p1, p2, currentPlayer, currentSign

    const init = () => {
        initPlayers();
        currentPlayer = p1;
        currentSign = p1.getSign();
        gameBoard.reset();
        updateBoard();
    }

    const initPlayers = () => {
        p1 = player('Player One', 'X');
        p2 = player('Player Two', 'O');
    }

    const changePlayer = () => {
        if (turn%2 === 0) {
            currentPlayer = p2
            currentSign = p2.getSign()
        } else {
            currentPlayer = p1
            currentSign = p1.getSign()
        }
        turn++
    }

    const declareWinner = (sign) => {
        if (p1.getSign() === sign) {
            alert(`${p1.getName()} wins!`)
        } else {
            alert(`${p2.getName()} wins!`)
        }
    }

    spaces.forEach((space) => {
        space.onclick = () => {
            if (gameBoard.getSpace(space.id[1]) === '') {
                gameBoard.setSpace(space.id[1], currentSign)
                updateBoard();
                if (gameBoard.checkWinner()) {
                    declareWinner(gameBoard.checkWinner());
                    resetGame();
                } else {
                    changePlayer();
                }

            }
        };
    });

    const updateBoard = () => {
        for (i = 0; i < 9; i++) {
            let space = document.querySelector(`#s${i}`);
            space.textContent = gameBoard.getSpace(i);
        }
    };

    const resetGame = () => {
        gameBoard.reset();
        currentPlayer = p1;
        updateBoard();
    }

    resetBtn.onclick = () => {
        resetGame();
    }

    return {init}
})();

const player = (name, sign) => {
    this.name = name
    this.sign = sign
    
    const getName = () => {
        return name
    }
    const getSign = () => {
        return sign
    }
    
    return { getName, getSign }
};

const gameBoard = (() => {
    let board = ['','','','','','','','',''];
    
    const setSpace = (space, sign) => {
        checkWinner();
        board[space] = sign
    }

    const getSpace = (space) => {
        return board[space]
    }

    const reset = () => {
        board = ['','','','','','','','','']
    };

    const checkWinner = () => {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]
            }
        }
        return null
    }
    return { setSpace, getSpace, reset, checkWinner }
})();

displayController.init()

//Need to add option for Players to set name and sign. Also need to style.
//Once those are complete, create option to play against AI