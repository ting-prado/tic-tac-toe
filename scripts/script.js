const gameboard = (() => {
    const boardArr = [];
    const signs = ['X', 'O'];
    for(let i=0; i<=8; i++){
        boardArr.push(i);
    }

    const gameboard = document.querySelectorAll('.box');
    const updateGameboard = (() => {
        for(let i=0; i<=8; i++){
            gameboard[i].textContent = boardArr[i];
        }
    })(); 
})();