const X = document.querySelector('#X');
const O = document.querySelector('#O');
const startMenu = document.getElementById('start');
X.onclick = () => {
    displayController.init('X', 'O');
    startMenu.style.display = 'none';
}

O.onclick = () => {
    displayController.init('O', 'X');
    startMenu.style.display = 'none';
}

const displayController = (() => {    
    const resetBtn = document.querySelector('.reset');
    const startBtn = document.querySelector('.start')
    const spaces = document.querySelectorAll('.space');
    const display = document.querySelector('.display');
    let gameOn = true
    let turn = 0

    const init = (p1Sign, p2Sign) => {
        initPlayers(p1Sign, p2Sign);
        currentPlayer = p1;
        currentSign = p1.getSign();
        gameBoard.reset();
        updateBoard();
    }

    const initPlayers = (p1Sign, p2Sign) => {
        p1 = player('Player One', p1Sign);
        p2 = player('Player Two', p2Sign);
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
            display.innerHTML = `${p1.getName()} wins!`
        } else if (p2.getSign() === sign) {
            display.innerHTML = `${p2.getName()} wins!`
        } else {
            display.innerHTML = 'Tie game!'
        }
    }

    spaces.forEach((space) => {
        space.onclick = () => {
            if (gameOn) {
                if (gameBoard.getSpace(space.id[1]) === '') {
                    gameBoard.setSpace(space.id[1], currentSign)
                    changePlayer()
                    updateBoard();
                    if (checkWinner()) {
                        declareWinner(checkWinner());
                        resetGame();
                        gameOn = false
                    }
                }
            }    
        }
    });

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
            if (gameBoard.getSpace([a]) && gameBoard.getSpace([a]) === gameBoard.getSpace([b]) && gameBoard.getSpace([a]) === gameBoard.getSpace([c])) {
                return gameBoard.getSpace([a])
            } else if (turn == 9) {
                return 'tie'
            }
        }
        return null
    }

    const updateBoard = () => {
        for (i = 0; i < 9; i++) {
            let space = document.querySelector(`#s${i}`);
            space.textContent = gameBoard.getSpace(i);
        }
    };

    const resetGame = () => {
        gameBoard.reset();
        currentPlayer = p1;
        currentSign = p1.getSign();
        updateBoard();
        turn = 0;
    }

    resetBtn.onclick = () => {
        resetGame();
        startMenu.style.zIndex = -1
    }

    startBtn.onclick = () => {
        startMenu.style.display = 'flex';
        display.innerHTML = 'Tic - Tac - Toe';
        gameOn = true
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
        board[space] = sign
    }

    const getSpace = (space) => {
        return board[space]
    }

    const reset = () => {
        board = ['','','','','','','','','']
    };

    return { setSpace, getSpace, reset }
})();



//create option to play against AI