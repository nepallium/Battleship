import { computerMakeMove } from "./computerPlayer";
import { loadBoard, styleSunkenShip, disableBoard, endGame } from "./domStuff";
import { checkWin, processAttack } from "./gameFunctions";
import gameState from "./gameState";

export function initializeListeners() {
    listenForRandomize();
    listenForReset();
    listenForShipDragAndDrop();

    // listen for user clicks on computer's board
    const compBoardElement = gameState.getElementFromPlayer(gameState.player1);
    for (const cell of compBoardElement.childNodes) {
        listenForAttack(cell);
    }
}

function listenForAttack(div) {
    const playerSectionElement = div.parentElement;

    const player = gameState.getPlayerFromElement(playerSectionElement);

    div.addEventListener("click", () => {
        handleAttackClick(div, player);
    });
}

function handleAttackClick(div, player) {
    // Only allow attacks during user's turn
    if (!gameState.isUserTurn()) {
        return;
    }

    div.style.pointerEvents = "none";
    processAttack(div, player);

    // If user sinks
    if (div.classList.contains("sunk")) {
        // Continue playing
    }
    // Else if attack was a miss, keep playing
    else if (!div.classList.contains("hit")) {
        // User missed - switch to computer's turn
        gameState.switchTurn();
        gameState.setComputerThinking(true);

        // Disable the entire board to prevent further clicks
        disableBoard(player);

        // Computer makes moves
        setTimeout(() => {
            computerMakeMove();
        }, 50);
    }
}

function listenForRandomize() {
    const randomizeBtn = document.querySelector(".options .randomize");

    randomizeBtn.addEventListener("click", () => {
        gameState.player2.gameboard.randomizeBoard();
        loadBoard(gameState.getElementFromPlayer(gameState.player2));
    });
}

function listenForReset() {
    const resetBtn = document.querySelector(".options .reset");

    resetBtn.addEventListener("click", () => {
        gameState.player2.gameboard.resetBoard();
        loadBoard(gameState.getElementFromPlayer(gameState.player2));
    });
}

function listenForShipDragAndDrop() {
    const shipElement = document.querySelector(".ship-to-place .ship");
    const shipCells = shipElement.childNodes;

    let dragCellIdx
    shipCells.forEach((shipCell) => {
        shipCell.addEventListener("mousedown", () => {
            dragCellIdx = shipCell.dataset.index
            console.log(dragCellIdx)
        });
    });

    
    // Listen for drop
    const userPlayer = gameState.player2;
    const userBoardElement = gameState.getElementFromPlayer(userPlayer);
    let head
    userBoardElement.addEventListener("dragover", (e) => {
        const cellDiv = e.target
        if (cellDiv.classList.contains("cell")) {
            e.preventDefault();
            
            // Get head coord
            const cellCoords = JSON.parse(cellDiv.dataset.position)
            if (true) { //assume horizontal
                head = [cellCoords[0], cellCoords[1] - dragCellIdx]
            }
        }
    });

    // Get correct ship object
    const ship = userPlayer.gameboard.shipsList.find(
        (shipFromList) => shipFromList.name === shipElement.dataset.shipName
    );

    userBoardElement.addEventListener("drop", (e) => {
        const cellDiv = e.target
        if (cellDiv.classList.contains("cell")) {
            userPlayer.gameboard.addShip(ship, head, "horizontal");
            loadBoard(userBoardElement);
        }
    });
}
