const displayController = (() => {    
    const resetBtn = document.querySelector('.reset');
    const spaces = document.querySelectorAll('.space');

    spaces.forEach((space) => {
        space.onclick = () => {
            space.innerHTML = 'CLICKED!'
        }
    });

    const updateBoard = () => {

    };

    resetBtn.onclick = () => {
        gameBoard.reset();
    }

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
    
    return {getName, getSign}
};

const gameBoard = (() => {
    let board = ['X','O','X','O','X','O','X','O','X'];
    
    const setSpace = (space, sign) => {
        board[space] = sign
    }

    const reset = () => {
        board = ['','','','','','','','','']
    };

    return {setSpace, reset}
})();
