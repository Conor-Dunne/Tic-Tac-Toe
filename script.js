

const gameBoard = (() => {
    const msgBox = document.getElementById("msg-box");
    const winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]];
    let usedSquares = [];
    const checkIfWin = (array, name) => {
        let winCheck = [];
        let message = "";
        const stopGame = () => {
            msgBox.textContent = message;
            allSquares.forEach(sq => sq.removeEventListener("click", go));
            restartGame();
            player1.restart();
            player2.restart();
            playGame();
        }
        const continueGame = () => {
            msgBox.textContent = "Nice move!";
            setTimeout(() => msgBox.textContent = `Next turn...${playGame.getPlayerName()}`, 1000);
        }
        winningCombos.forEach(arr => winCheck.push(arr.every(i => array.includes(i))));

        if (winCheck.includes(true)) {
            message = `${name} wins!`;
            stopGame()
        } else if (usedSquares.length == 9) {
            message = "It's a draw!"
            stopGame()
        } else continueGame ();

        winCheck.includes(true) ? stopGame() : continueGame();
        
    }
        const restartGame = () => {
            usedSquares = [];
            winCheck = [];
            setTimeout(() => allSquares.forEach(sq => sq.textContent = ""), 5000);
            setTimeout(() => msgBox.textContent = "Let's go again!", 3000);
            allSquares.forEach(sq => sq.addEventListener("click", go));

        }
    

    const placeMarker = (marker, squareNum) => {
        if (usedSquares.includes(squareNum)) { alert("Please choose another square"); };
        document.getElementById(squareNum).textContent = marker;
        usedSquares.push(squareNum);
        console.log(usedSquares);
    };

    return {
        placeMarker,
        checkIfWin
    };

})();

const Player = (name, marker) => {
    let playerSquares = [];
    const getName = () => name;
    // const getMarker = () => marker;
    const takeTurn = (marker, square) => {
        playerSquares.push(square);
        gameBoard.placeMarker(marker, square);
        gameBoard.checkIfWin(playerSquares, name);

    };
    const restart = () => {
        playerSquares = [];
    };

    return { takeTurn, restart, getName };
};

const player1 = Player("Player X", "X");
const player2 = Player("Player O", "O");


const playGame = (() => {
    let currentPlayer = player1;
    let marker = "X";
    const switchPlayer = () => {
        if (currentPlayer == player1) {
            currentPlayer = player2;
            marker = "O";
        } else {
            currentPlayer = player1;
            marker = "X"
        };
    };
    const playerMove = (num) => {
        currentPlayer.takeTurn(marker, num);
        switchPlayer();
    };
    const getPlayerName = () => {
        return currentPlayer.getName()
    };

    return { playerMove, getPlayerName };

})();


const allSquares = Array.from(document.querySelectorAll(".game-square"));
console.log(allSquares);

allSquares.forEach(sq => sq.addEventListener("click", go));

function go() {
    let num = Number(this.id);
    playGame.playerMove(num);
}




// ##GAMEBOARD:
// --place markers on gameBoard
// --log used squares and prevent choosing same square twice
// --log players chosen squares
// --check for winning move


//##Player
//--make new players / assign names
//--assign X or O to player
//--choose square to place marker by click

//##gameflow
//--decide who's turn it is
//display game info on DOM (WInner, etc)
//--end / restart / start game functions



