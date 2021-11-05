const X = document.querySelector('#X');
const O = document.querySelector('#O');
const startMenu = document.getElementById('start');
const toggleAI = document.querySelector('.toggleAI');
let vsBot = false;

X.onclick = () => {
    displayController.init('X', 'O');
    startMenu.style.display = 'none';
}

O.onclick = () => {
    displayController.init('O', 'X');
    startMenu.style.display = 'none';
}

toggleAI.onclick = () => {
    vsBot = !vsBot
    toggleAI.classList.toggle('aiTrue')
    if (toggleAI.classList.contains('aiTrue')) {
        toggleAI.innerHTML = 'VS Computer'
    } else {
        toggleAI.innerHTML = 'VS Player 2'
    }
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

    const miniMax = (hypoBoard, depth, maxing) => {
        let winner = displayController.checkWinner(hypoBoard);
        if (depth == 0 | winner === 'X' | winner === 'O' | winner === 'tie') {
            if (winner === p1.getSign()) {
                return 10
            } else if (winner === p2.getSign()) {
                return -10
            } else {
                return 0
            }
        }
        if (maxing) {
            let maxedVal = -Infinity
            for (let i = 0; i < 9; i++) {
                if (hypoBoard[i] === '') {
                    hypoBoard[i] = p1.getSign();
                    let val = miniMax(hypoBoard, depth - 1, false);
                    hypoBoard[i] = '';
                    if (val > maxedVal) {
                        maxedVal = val;
                    }
                }
            }
            return maxedVal
        } else {
            let minVal = +Infinity
            for (let i = 0; i < 9; i++) {
                if (hypoBoard[i] === '') {
                    hypoBoard[i] = p2.getSign();
                    let val = miniMax(hypoBoard, depth - 1, true)
                    hypoBoard[i] = ''
                    if (val < minVal) {
                        minVal = val;
                    }
                }
            }
            return minVal
        }
    }

    const findBestMove = (currentBoard) => {
        let bestVal = +Infinity
        let bestMove = -1

        for (let i = 0; i < 9; i++) {
            if (currentBoard[i] === '') {
                currentBoard[i] = p2.getSign();
                let moveVal = miniMax(currentBoard, 9-turn, false);
                currentBoard[i] = '';
                if (moveVal < bestVal) {
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }
        console.log(bestMove)
        return bestMove
    }

    const aiPlay = (player) => {
        let bestMove = findBestMove(gameBoard.getBoard());
        gameBoard.setSpace(bestMove, player.getSign())
    }

    const changePlayer = () => {
        if (turn%2 === 0) {
            currentPlayer = p1
            currentSign = p1.getSign()
        } else {
            currentPlayer = p2
            currentSign = p2.getSign()
        }
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
                    gameBoard.setSpace(space.id[1], currentSign);
                    if (checkWinner(gameBoard.getBoard())) {
                        declareWinner(checkWinner(gameBoard.getBoard()));
                        resetGame();
                        gameOn = false
                    } else {
                        turn++
                        if (vsBot) {
                            aiPlay(p2)
                        } else {
                            changePlayer();  
                        }
                        updateBoard();
                    }
                }
            }    
        }
    });

    const checkWinner = (board) => {
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
            } else if (turn == 8) {
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
    }

    startBtn.onclick = () => {
        startMenu.style.display = 'flex';
        display.innerHTML = 'Tic - Tac - Toe';
        gameOn = true
    }

    return {init, checkWinner, findBestMove}
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
        if (board[space] === "") {
            board[space] = sign;
        }
    }

    const getSpace = (space) => {
        return board[space]
    }

    const getBoard = () => {
        return board
    }

    const reset = () => {
        board = ['','','','','','','','','']
    };

    return { setSpace, getSpace, reset, getBoard }
})();

// Need to improve AI functionality