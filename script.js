

const gameBoard = (() => {
    const winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]];
    const usedSquares = [];
    const checkIfWin = (array, name) => {
        const winCheck = [];
        winningCombos.forEach(arr => winCheck.push(arr.every(i => array.includes(i))));
        return winCheck.includes(true) ? alert(`${name} wins!`) : alert("Nice move");
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
    const playerSquares = [];
    // const getName = () => name;
    // const getMarker = () => marker;
    const takeTurn = (marker, square) => {
        playerSquares.push(square);
        gameBoard.placeMarker(marker, square);
        gameBoard.checkIfWin(playerSquares, name);

    }

    return { takeTurn };
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
    }
    const playerMove = (num) => {
        currentPlayer.takeTurn(marker, num);
        switchPlayer();
    }

    return { playerMove };

})();


const allSquares = Array.from(document.querySelectorAll(".game-square"));
console.log(allSquares);

allSquares.forEach(sq => sq.addEventListener("click", go))

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



