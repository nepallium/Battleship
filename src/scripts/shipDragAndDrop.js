import {
    loadBoard,
    displayShipToPlace,
    showStartOptions,
    styleNoDropCells,
    unstyleNoDropCells,
    hideStartOptions,
} from "./domStuff";
import gameState from "./gameState";

let direction = "horizontal"; // default to horizontal
const getElementFromPlayer2 = () => {
    const startDialog = document.querySelector("dialog.start-game-modal")
    return startDialog.querySelector("section.player-2")
}

export function listenForRandomize() {
    const randomizeBtn = document.querySelector(".options .randomize");

    randomizeBtn.addEventListener("click", () => {
        gameState.player2.gameboard.randomizeBoard();
        loadBoard(getElementFromPlayer2());
        showStartOptions();
    });
}

export function listenForReset() {
    const resetBtn = document.querySelector(".options .reset");

    resetBtn.addEventListener("click", () => {
        gameState.player2.gameboard.resetBoard();
        loadBoard(getElementFromPlayer2());
        resetShipPlacer();
        hideStartOptions();
    });
}

export function resetShipPlacer() {
    let shipsToPlace = gameState.player2.gameboard.shipsList;
    direction = "horizontal";

    const containerElement = document.querySelector(".ship-to-place");
    containerElement.style.display = "inline-block";

    displayShipToPlace(shipsToPlace[0], direction);
}

export function listenForShipDragAndDrop() {
    const shipElement = document.querySelector(".ship-to-place .ship");

    let dragCellIdx;
    shipElement.addEventListener("mousedown", (e) => {
        dragCellIdx = e.target.dataset.index;
    });

    // styling no-drop cells logic
    let isDragging = false;
    shipElement.addEventListener("drag", () => {
        isDragging = true;
        styleNoDropCells();
    });
    shipElement.addEventListener("dragend", () => {
        if (isDragging) {
            isDragging = false;
            unstyleNoDropCells();
        }
    });

    // Listen for drop
    let head;
    const userPlayer = gameState.player2;
    const userBoardElement = getElementFromPlayer2();

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

            if (userPlayer.gameboard.canPlaceShip(ship, head, direction)) {
                userPlayer.gameboard.addShip(ship, head, direction);
                userPlayer.gameboard.setAdjacentCells(
                    head,
                    ship.length,
                    direction
                );
                loadBoard(userBoardElement);
            } else {
                return;
            }

            if (++shipIdx === userPlayer.gameboard.shipsList.length) {
                showStartOptions();
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
    rotateBtn.addEventListener(
        "mousedown",
        (e) => {
            if (e.detail > 1) {
                e.preventDefault();
            }
        },
        false
    );
}
