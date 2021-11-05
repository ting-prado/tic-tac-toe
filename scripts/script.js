let won = false,
    round = 1;

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

    const drawSign = (row,column,sign) => {
        gameboard.boardArr[row][column] = sign;
    }

    return {getName, getSign, drawSign}
}

const endGame = (gameMode, winner) => {
    const title = document.querySelector('h1');
    const body = document.querySelector('body');

    const restart = () => {
        for(let i=0; i<=2; i++){ //Reset array values to ""
            for(let j=0; j<=2; j++){
                gameboard.boardArr[i][j] = "";
            }
        }
        gameboard.updateGameboard();
        won = false;

        if(gameMode == 'vsplayers'){
            playersGameflow();
        }
        else {
            aiGameflow();
        }

        const div = document.getElementById('gameoverDiv');
        div.remove();
        title.setAttribute('style','filter: opacity(1) blur(0)');
        body.setAttribute('style','backdrop-filter: blur(0)');
    }
    
    const display = (() => {
        gameboard.board.setAttribute('style','filter: opacity(0.5) blur(2px); display: flex');
        title.setAttribute('style','filter: opacity(0.5) blur(2px)');
        body.setAttribute('style','backdrop-filter: blur(2px)');

        const div = document.createElement('div');
        const par = document.createElement('p');
        const restartBtn = document.createElement('button');
        div.setAttribute('id','gameoverDiv');
        restartBtn.textContent = 'Restart?';
        div.classList.add('finalDiv');
        restartBtn.classList.add('restartBtn');
        par.classList.add('resultMessage');

        if(winner != "") {
            par.textContent = `${winner} won!`;
        }
        else{
            par.textContent = "It's a tie.";
        }

        body.appendChild(div);
        div.appendChild(par);
        div.appendChild(restartBtn);

        restartBtn.addEventListener('click', restart);
    })();
}

const winnerChecker = () => {
    let sequence = '';

    const checkStr = str => {
        if(str == 'XXX' || str == 'OOO'){
            won = true;
        }
    }

    for(let i=0; i<=2; i++){ //Horizontal checker
        sequence = '';
        for(let j=0; j<=2; j++){
            sequence += gameboard.boardArr[i][j];
        }
        checkStr(sequence);
    }

    for(let i=0; i<=2; i++){ //Vertical checker
        sequence = '';
        for(let j=0; j<=2; j++){
            sequence += gameboard.boardArr[j][i];
        }
        checkStr(sequence);
    }

    sequence = '';
    for(let i=2, j=0; i>=0; i--, j++){ //Diagonal(RtL) checker
        sequence += gameboard.boardArr[j][i];
    }
    checkStr(sequence);

    sequence = '';
    for(let i=0; i<=2; i++){ //Diagonal(LtR) checker
        sequence += gameboard.boardArr[i][i];
    }
    checkStr(sequence);
}

const aiGameflow = () => {
    const displayChanges = (() => {
        const players = document.querySelector('.playerNamesCont');
        players.setAttribute('style', 'display: none');
        gameboard.board.setAttribute('style', 'display: flex');
    })();

    const player = Player(document.querySelector('#player').value, 'X');
    const computer = Player('Computer', 'O');
    let round = 1,
        board = gameboard.boardArr,
        currentPlayer = player,
        gameMode = 'vsai';

    const playerTurn = e => {
        let row = e.target.id.slice(3,4);
        let column = e.target.id.slice(4,5);
        if(board[row][column] == ""){
            player.drawSign(row, column, player.getSign());
            gameboard.updateGameboard();
            winnerChecker();
            winStatus();
            ++round;

            if(won == false && round<9){
                setTimeout(aiTurn, 1000);
                document.querySelector('#gameboard').style.cursor = 'wait';
                document.querySelector('body').style.cursor = 'wait';
                setTimeout(function(){
                    document.querySelector('#gameboard').style.cursor = 'pointer';
                    document.querySelector('body').style.cursor = 'auto';
                }, 1000);
            }
        }
    }

    const aiTurn = () => {
        currentPlayer = computer;
        //get best move index through minimax algorithm
        let bestScore = -Infinity,
            bestMove;

        const minimax = (board) => {
            return 1;
        }

        for(let i=0; i<=2; i++){ //Check which are empty in the array
            for(let j=0; j<=2; j++){
                if(board[i][j] == ""){
                    board[i][j] = computer.getSign();
                    let score = minimax(board);
                    board[i][j] = "";
                    if(score > bestScore){
                        bestScore = score;
                        bestMove = {i,j};
                    }
                }
            }
        }
        computer.drawSign(bestMove.i, bestMove.j, computer.getSign());
        gameboard.updateGameboard();
        winnerChecker();
        winStatus();
        ++round;
        currentPlayer = player;
    }

    const winStatus = () => {
        if(won){
            endGame(gameMode, currentPlayer.getName());
            gameboard.gridboxes.forEach(box => {
                box.removeEventListener('click', playerTurn);
            });
        }
        else if(won == false && round == 9){
            endGame(gameMode, "");
            gameboard.gridboxes.forEach(box => {
                box.removeEventListener('click', playerTurn);
            });
        }
        else return;
    }

    gameboard.gridboxes.forEach(box => {
        box.addEventListener('click', playerTurn);
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
    let currentPlayer = player1,
        round = 1,
        gameMode = 'vsplayers';

    const drawBoard = e => {
        let row = e.target.id.slice(3,4);
        let column = e.target.id.slice(4,5);
        let board = gameboard.boardArr;
        if(board[row][column] == ""){
            currentPlayer.drawSign(row, column, currentPlayer.getSign());
            gameboard.updateGameboard();
            winnerChecker();

            const winStatus = (() => {
                if(won) {
                    endGame(gameMode, currentPlayer.getName());
                }
                else if(won == false && round == 9){ //Game tied
                    won = 'tied';
                    endGame(gameMode, "");
                }
            })();

            if(won == true || won == 'tied') {
                gameboard.gridboxes.forEach(box => {
                    box.removeEventListener('click', drawBoard);
                });
            }

            if(currentPlayer == player1){
                currentPlayer = player2;
            }
            else{
                currentPlayer = player1;
            }
            round++;
        }
    }

    gameboard.gridboxes.forEach(box => {
        box.addEventListener('click', drawBoard);
    });
}

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

        startBtn.addEventListener('click', function() {
            if(player.value != ""){
                aiGameflow();
            }
            else {
                alert('Please enter your name correctly.');
            }
        });
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

        startBtn.addEventListener('click', function(){
            if(player1.value != "" && player2.value != ""){
                playersGameflow();
            }
            else {
                alert('Please enter your names correctly.');
            }
        });
    }

    compChoice.addEventListener('click', aiNameInput);
    humanChoice.addEventListener('click', playerNamesInput);
})();