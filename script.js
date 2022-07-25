const gameBoard = (()=>{
    const winningCombos= [[1,2,3], [4,5,6], [7,8,9], [1,4,7],[2,5,8],[3,6,9],[1,5,9],[7,5,3]];
    const usedSquares = [];
    const checkIfWin = () => {
        const winCheck = [];
        winningCombos.forEach(arr => winCheck.push(arr.every(i => usedSquares.includes(i))));
        return winCheck.includes(true) ? alert("You win!") : alert("Nice move");
    }
    const placeMarker = (marker, squareNum) => {
        if (usedSquares.includes(squareNum)) { alert("Please choose another square");};
        document.getElementById(squareNum).textContent = marker;
        usedSquares.push(squareNum);
        console.log(usedSquares);
        checkIfWin();
    };

    return {
        placeMarker
    };

})();





const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    const takeTurn = (marker, square) => {
        return gameBoard.placeMarker(marker, square);
    }

    return {getName, getMarker, takeTurn};
};

const player1 = Player("Conor", "X");


player1.takeTurn("X", 5);
player1.takeTurn("X", 9);
player1.takeTurn("X", 1);





// function test() {
//     // document.querySelector("#5").textContent = "X";
//     console.log(document.querySelectorAll(".game-square"));
//     console.log(document.getElementById("5"));
// }




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



