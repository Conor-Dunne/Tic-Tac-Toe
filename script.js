const gameBoard = (()=>{
    const winningCombos= [[1,2,3], [4,5,6], [7,8,9], [1,4,7],[2,5,8],[3,6,9],[1,5,9],[7,5,3]];
    const placeMarker = (marker, squareNum) => {
        document.getElementById(squareNum).textContent = marker;
    };

    return {
        placeMarker
    };

})();

console.log(gameBoard)

gameBoard.placeMarker("X", 5);
gameBoard.placeMarker("X", 1);
gameBoard.placeMarker("X", 9);



function test() {
    // document.querySelector("#5").textContent = "X";
    console.log(document.querySelectorAll(".game-square"));
    console.log(document.getElementById("5"));
}






