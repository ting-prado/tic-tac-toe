const aiGameflow = () => {

}

const gameboard = (() => {
    const boardArr = [];
    boardArr.length = 9;

    const gridboxes = document.querySelectorAll('.box');
    const updateGameboard = () => {
        for(let i=0; i<=8; i++){
            gridboxes[i].textContent = boardArr[i];
        }
    }
    
    return {boardArr, gridboxes, updateGameboard}
})();

const Player = (name,sign) => {
    const getName = () => name;
    const getSign = () => sign;

    const drawSign = (index,sign) => {
        gameboard.boardArr[index] = sign;
    }

    let occupiedGrids = [];

    return {getName, getSign, drawSign, occupiedGrids}
}

const playersGameflow = (() => {
    const player1 = Player('human', 'X');
    const player2 = Player('computer', 'O');
    let currentPlayer = player1;

    const drawBoard = e => {
        let index = e.target.id.slice(3,5);
        let board = gameboard.boardArr;
        if(board[index] == undefined){
            currentPlayer.drawSign(index, currentPlayer.getSign());
            currentPlayer.occupiedGrids.push(index);
            gameboard.updateGameboard();
            winnerChecker(currentPlayer.getName(), currentPlayer.occupiedGrids);

            if(currentPlayer == player1){
                currentPlayer = player2;
            }
            else{
                currentPlayer = player1;
            }
        }
    }

    const winnerChecker = (name,grids) => {
        if((grids.includes('0') && grids.includes('1') && grids.includes('2')) ||
        (grids.includes('0') && grids.includes('3') && grids.includes('6')) ||
        (grids.includes('0') && grids.includes('4') && grids.includes('8')) ||
        (grids.includes('1') && grids.includes('4') && grids.includes('7')) ||
        (grids.includes('2') && grids.includes('5') && grids.includes('8')) ||
        (grids.includes('2') && grids.includes('4') && grids.includes('6')) ||
        (grids.includes('3') && grids.includes('4') && grids.includes('5')) ||
        (grids.includes('6') && grids.includes('7') && grids.includes('8'))){
            //winning effect
        }
    }

    gameboard.gridboxes.forEach(box => {
        box.addEventListener('click', drawBoard);
    });
})();

// const displayChanges = (() => {
//     const humanChoice = document.querySelector('#human');
//     const compChoice = document.querySelector('#computer');
//     const choices = document.querySelectorAll('#choices');

//     const namesInput = () => {
//         choices.forEach(choice => {
//             choice.setAttribute('style', 'display: none');
//         });
//     }

//     humanChoice.addEventListener('click', playersGameflow);
//     compChoice.addEventListener('click', aiGameflow);
//     humanChoice.addEventListener('click', namesInput);
// })();