const gameboard = (() => {
    const boardArr = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    const board = document.querySelector('#gameboard');

    const gridboxes = document.querySelectorAll('.box');
    const updateGameboard = () => {
        let i=0,
        j=0;

        while(i<=8){
            for(let k=0; k<=2; k++){
                gridboxes[i].textContent = boardArr[j][k];
                i++;
            }
            j++;
            k=0;
        }
    }

    return {boardArr, board, gridboxes, updateGameboard}
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
        //add restart option
        console.log(`${name} wins!`);
    }
    // else if(){
    //     //if array is full but game is tied
    // }
}

const aiGameflow = () => {
    const displayChanges = (() => {
        const players = document.querySelector('.playerNamesCont');
        players.setAttribute('style', 'display: none');
        gameboard.board.setAttribute('style', 'display: flex');
    })();

    const player = Player(document.querySelector('#player').value, 'X');
    const computer = Player('Computer', 'O');

    const playerDraw = e => {
        let index = e.target.id.slice(3,5);
        let board = gameboard.boardArr;
        if(board[index] == undefined){
            player.drawSign(index, player.getSign());
            player.occupiedGrids.push(index);
            gameboard.updateGameboard();
            winnerChecker(player.getName(), player.occupiedGrids);
        }
    }

    const aiDraw = () => {
        //get index through minimax algorithm
        //drawSign
        //push sign to array
        //wait for 1s to update gameboard
        //winner checker
    }

    gameboard.gridboxes.forEach(box => {
        box.addEventListener('click', playerDraw);
        box.addEventListener('click', aiDraw);
    });
}

const playersGameflow = () => {
    const displayChanges = (() => {
        const players = document.querySelector('.playerNamesCont');
        players.setAttribute('style', 'display: none');
        gameboard.board.setAttribute('style', 'display: flex');
    })();

    const getNames = (() => {
        const input1 = document.querySelector('#player1').value;
        const input2 = document.querySelector('#player2').value;

        return {input1, input2}
    })();

    const player1 = Player(getNames.input1, 'X');
    const player2 = Player(getNames.input2, 'O');
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

    gameboard.gridboxes.forEach(box => {
        box.addEventListener('click', drawBoard);
    });
};

const displayChanges = (() => {
    const humanChoice = document.querySelector('#human');
    const compChoice = document.querySelector('#computer');
    const choices = document.querySelectorAll('#choices');

    const aiNameInput= () => {
        choices.forEach(choice => {
            choice.setAttribute('style', 'display: none');
        });
        const playersDiv = document.createElement('div');
        const body = document.querySelector('body');
        const player = document.createElement('input');
        const label = document.createElement('label');
        const startBtn = document.createElement('button');

        playersDiv.classList.add('playerNamesCont');
        player.setAttribute('id', 'player');
        label.setAttribute('for', 'player');
        label.setAttribute('id', 'ailabel');
        startBtn.setAttribute('id', 'startBtn');
        label.textContent = 'Player: ';
        startBtn.textContent = 'Start Game';

        body.appendChild(playersDiv);
        playersDiv.appendChild(label);
        label.appendChild(player);
        playersDiv.appendChild(startBtn);

        startBtn.addEventListener('click', aiGameflow);
    }

    const playerNamesInput = () => {
        choices.forEach(choice => {
            choice.setAttribute('style', 'display: none');
        });
        const player1 = document.createElement('input');
        const label1 = document.createElement('label');
        const player2 = document.createElement('input');
        const label2 = document.createElement('label');
        const playersDiv = document.createElement('div');
        const startBtn = document.createElement('button');
        const body = document.querySelector('body');

        playersDiv.classList.add('playerNamesCont');
        player1.setAttribute('id', 'player1');
        player1.classList.add('playersInput');
        player2.setAttribute('id', 'player2');
        player2.classList.add('playersInput');
        label1.setAttribute('for', 'player1');
        label2.setAttribute('for', 'player2');
        startBtn.setAttribute('id', 'startBtn');
        label1.textContent = 'Player 1: ';
        label2.textContent = 'Player 2: ';
        startBtn.textContent = 'Start Game';
        body.appendChild(playersDiv);
        playersDiv.appendChild(label1);
        label1.appendChild(player1);
        playersDiv.appendChild(label2);
        label2.appendChild(player2);
        playersDiv.appendChild(startBtn);

        startBtn.addEventListener('click', playersGameflow);
    }

    compChoice.addEventListener('click', aiNameInput);
    humanChoice.addEventListener('click', playerNamesInput);
})();