const aiGameflow = () => {

}

const gameboard = (() => {
    const boardArr = [];
    for(let i=0; i<=8; i++){
        boardArr.push(null);
    }

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
        gameboard.updateGameboard();
    }

    return {getName, getSign, drawSign}
}

const playersGameflow = (() => {
    const player1 = Player('human', 'X');
    const player2 = Player('computer', 'O');
    let currentPlayer = player1;

    const getIndex = e => {
        let index = e.target.id.slice(3,5);
        currentPlayer.drawSign(index, currentPlayer.getSign());
    }

    gameboard.gridboxes.forEach(box => {
        box.addEventListener('click', getIndex);
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