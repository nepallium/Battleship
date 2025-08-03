import {
    loadBoard,
    styleSunkenShip,
    disableBoard,
    endGame,
    displayShipToPlace,
    canStartGame,
} from "./domStuff";
import { checkWin, processAttack } from "./gameFunctions";
import gameState from "./gameState";

let direction = "horizontal"; // default to horizontal

export function listenForRandomize() {
    const randomizeBtn = document.querySelector(".options .randomize");

    randomizeBtn.addEventListener("click", () => {
        gameState.player2.gameboard.randomizeBoard();
        loadBoard(gameState.getElementFromPlayer(gameState.player2));
        canStartGame();
    });
}

export function listenForReset() {
    const resetBtn = document.querySelector(".options .reset");

    resetBtn.addEventListener("click", () => {
        gameState.player2.gameboard.resetBoard();
        loadBoard(gameState.getElementFromPlayer(gameState.player2));
        resetShipPlacer();
    });
}

export function resetShipPlacer() {
    let shipsToPlace = gameState.player2.gameboard.shipsList;
    direction = "horizontal";
    
    const containerElement = document.querySelector(".ship-to-place")
    containerElement.style.display = "inline-block"

    displayShipToPlace(shipsToPlace[0], direction);
}

export function listenForShipDragAndDrop() {
    const shipElement = document.querySelector(".ship-to-place .ship");

    let dragCellIdx;
    shipElement.addEventListener("mousedown", (e) => {
        dragCellIdx = e.target.dataset.index;
    });

    // Listen for drop
    let head;
    const userPlayer = gameState.player2;
    const userBoardElement = gameState.getElementFromPlayer(userPlayer);

    userBoardElement.addEventListener("dragover", (e) => {
        const cellDiv = e.target;
        if (cellDiv.classList.contains("cell")) {
            e.preventDefault();
        }
    });

    userBoardElement.addEventListener("drop", (e) => {
        // Get correct ship object
        const ship = userPlayer.gameboard.shipsList.find(
            (shipFromList) => shipFromList.name === shipElement.dataset.shipName
        );
        let shipIdx = userPlayer.gameboard.shipsList.indexOf(ship);

        const cellDiv = e.target;
        if (cellDiv.classList.contains("cell")) {
            if (dragCellIdx == undefined) {
                return;
            }

            // Get head coord
            const cellCoords = JSON.parse(cellDiv.dataset.position);
            if (direction === "horizontal") {
                head = [cellCoords[0], cellCoords[1] - dragCellIdx];
            } else if (direction === "vertical") {
                head = [cellCoords[0] - dragCellIdx, cellCoords[1]];
            }

            userPlayer.gameboard.addShip(ship, head, direction);
            loadBoard(userBoardElement);

            if (++shipIdx === userPlayer.gameboard.shipsList.length) {
                canStartGame();
            } else {
                // display the next ship to place
                displayShipToPlace(
                    userPlayer.gameboard.shipsList[shipIdx],
                    direction
                );
            }
        }
    });
}

export function listenForRotate() {
    const rotateBtn = document.querySelector("span.replay");
    const userPlayer = gameState.player2;

    rotateBtn.addEventListener("click", () => {
        direction = direction === "horizontal" ? "vertical" : "horizontal";

        const container = document.querySelector(".ship-to-place");
        const shipElement = container.querySelector(".ship");

        const ship = userPlayer.gameboard.shipsList.find(
            (shipFromList) => shipFromList.name === shipElement.dataset.shipName
        );
        let shipIdx = userPlayer.gameboard.shipsList.indexOf(ship);

        displayShipToPlace(userPlayer.gameboard.shipsList[shipIdx], direction);
    });

    // disable double click selection
    rotateBtn.addEventListener("mousedown", (e) => {
        if (e.detail > 1) {
            e.preventDefault()
        }
    }, false)
}
