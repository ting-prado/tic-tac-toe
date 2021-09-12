const Player = (name,sign) => {
    const getName = () => name;
    const getSign = () => sign;
}

const Gameboard = (() => {
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

    const drawBoard = e => {
        let index = e.target.id.slice(3,5);
        const arr = ['X', 'O'];
        boardArr[index] = arr[Math.floor(Math.random() * 2)];
        updateGameboard();
    }

    gridboxes.forEach(box => {
        box.addEventListener('click', drawBoard);
    });
    
    return {gridboxes, updateGameboard, drawBoard}
})();