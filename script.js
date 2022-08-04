
let gameMode = "";
let availableSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let doubleSelection = false;


const gameBoard = (() => {
    const msgBox = document.getElementById("msg-box");
    const winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]];
    let usedSquares = [];
    const removeSquare = (sq) => {
        const index = availableSquares.indexOf(sq);
        availableSquares.splice(index, 1);
    }
    const checkIfWin = (array, name) => {
        let winCheck = [];
        let message = "";
        const stopGame = () => {
            msgBox.textContent = message;
            allSquares.forEach(sq => sq.removeEventListener("click", go));
            restartGame();
            player1.restart();
            player2.restart();
            computer.restart();
            playGame();
        }
        const continueGame = () => {
            allSquares.forEach(sq => sq.removeEventListener("click", go));
            msgBox.textContent = "Nice move!";
            setTimeout(() => msgBox.textContent = `Next turn...${playGame.getPlayerName()}`, 1000);
            setTimeout(()=>allSquares.forEach(sq => sq.addEventListener("click", go)), 2000)
        }
        winningCombos.forEach(arr => winCheck.push(arr.every(i => array.includes(i))));

        if (winCheck.includes(true)) {
            message = `${name} wins!`;
            winSound.play();
            stopGame()

        } else if (usedSquares.length == 9) {
            message = "It's a draw!"
            stopGame()
        } else continueGame();


    }
    const restartGame = () => {
        setTimeout(() => allSquares.forEach(sq => sq.textContent = ""), 5000);
        setTimeout(() => msgBox.textContent = "Let's go again!", 3000);
        setTimeout(() => msgBox.textContent = `Next turn...${playGame.getPlayerName()}`, 1000);
        allSquares.forEach(sq => sq.addEventListener("click", go));
        availableSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        usedSquares = [];
        winCheck = [];
    }


    const placeMarker = (marker, squareNum) => { //must fix issue of not restarting curr move
        if (usedSquares.includes(squareNum)) {
            doubleSelection = true;
            msgBox.textContent = "Try again";
            return;
        } else {
            doubleSelection = false;
            document.getElementById(squareNum).textContent = marker;
            usedSquares.push(squareNum);
        }

    };

    return {
        placeMarker,
        checkIfWin,
        removeSquare
    };

})();

const Player = (name, marker) => {
    let playerSquares = [];
    const getName = () => name;
    // const getMarker = () => marker;
    const takeTurn = (marker, square) => {
        gameBoard.placeMarker(marker, square);
        if (doubleSelection == true) {
            return;
        } else
            playerSquares.push(square);
        gameBoard.removeSquare(square);
        gameBoard.checkIfWin(playerSquares, name);

    };

    const getRandomSquare = () => {
        let randNum = Math.floor(Math.random() * ((availableSquares.length - 1) - 0) + 0);
        return availableSquares[randNum];
    }

    const restart = () => {
        playerSquares = [];
    };

    return { takeTurn, restart, getName, getRandomSquare };
};

const player1 = Player("Player X", "X");
const player2 = Player("Player O", "O");
const computer = Player("Computer", "O");

const playGame = (() => {
    let currentPlayer = player1;
    let otherPLayer = ""
    let marker = "X";


    const switchPlayer = () => {
        gameMode == "playerVcomp" ? otherPLayer = computer : otherPLayer = player2;
        if (currentPlayer == player1) {
            currentPlayer = otherPLayer;
            marker = "O";
            p2sound.play();
        }
        else {
            currentPlayer = player1;
            marker = "X"
            p1sound.play();
        };
        if (otherPLayer == computer) {
            setTimeout(() => computerMove(), 3000);
        };
    };
    const playerMove = (num) => {
        currentPlayer.takeTurn(marker, num);
        if (doubleSelection == true) {
            return;
        } else switchPlayer();
    };

    const computerMove = () => {
        if (currentPlayer == computer) {
            playerMove(computer.getRandomSquare());
        }
    }


    const getPlayerName = () => {
        return currentPlayer.getName()
    };

    return { playerMove, getPlayerName };

})();






const startBtn = document.querySelector("#start-btn");
const gameScreen = document.querySelector(".game-screen");
const startGameScreen = document.querySelector("#start-game");
const gameModeScreen = document.querySelector("#game-mode");
const vsComputer = document.querySelector("#vsComp");
const vsPlayer = document.querySelector("#vsPlayer");
const allSquares = Array.from(document.querySelectorAll(".game-square"));
const p1sound = new Audio("./sounds/366102__original-sound__confirmation-upward (1).wav");
const p2sound = new Audio("./sounds/366104__original-sound__confirmation-downward.wav");
const winSound = new Audio("./sounds/495005__evretro__win-video-game-sound.wav");
const startApp = () => {
    startGameScreen.classList.add("hide-content");
    gameModeScreen.classList.remove("hide-content");
}

const selectGameMode = (e) => {
    e.target.id === "vsComp" ? gameMode = "playerVcomp" : gameMode = "playerVplayer";
    gameModeScreen.classList.add("hide-content");
    gameScreen.style.filter = "none";
}

allSquares.forEach(sq => sq.addEventListener("click", go));

function go() {
    let num = Number(this.id);
    playGame.playerMove(num);
}

startBtn.addEventListener("click", startApp);
vsComputer.addEventListener("click", selectGameMode);
vsPlayer.addEventListener("click", selectGameMode);







