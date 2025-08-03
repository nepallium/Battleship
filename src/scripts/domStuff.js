import gameState from "./gameState";
import Ship from "./classes/Ship";

export function loadBoard(playerSectionElement) {
    playerSectionElement.innerHTML = "";
    const player = gameState.getPlayerFromElement(playerSectionElement);
    const playerBoard = player.gameboard;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            const cellVal = playerBoard.board[i][j];
            cell.classList.add("cell");

            cell.dataset.position = JSON.stringify([i, j]);

            playerSectionElement.appendChild(cell);

            // only display ships on user's own board
            if (player === gameState.player2) {
                if (cellVal instanceof Ship) {
                    const ship = cellVal;
                    cell.dataset.value = "ship";
                    cell.dataset.shipName = ship.name;
                }
            }
        }
    }
}

export function styleSunkenShip(shipCell) {
    const player = shipCell.parentElement;
    const shipName = shipCell.dataset.shipName;

    const shipCells = player.querySelectorAll(`[data-ship-name="${shipName}"]`);

    for (const cell of shipCells) {
        cell.classList.add("sunk");
        cell.classList.remove("hit");
    }
}

export function getDivFromCoord(coord, player) {
    const playerSectionElement = gameState.getElementFromPlayer(player);

    const selectedDiv = playerSectionElement.querySelector(
        `div.cell[data-position="${JSON.stringify(coord)}"]`
    );

    console.log(selectedDiv);
    return selectedDiv;
}

export function disableBoard(player) {
    const playerSection = gameState.getElementFromPlayer(player);
    playerSection.classList.add("disabled");
}

export function enableBoard() {
    const player1Section = document.querySelector("section.player-1");
    player1Section.classList.remove("disabled");
}

export function endGame(winner) {
    const winningPlayer = winner === gameState.player2 ? "User" : "Computer"

    disableBoard(gameState.player1)
    disableBoard(gameState.player2)
    console.log(`GGs! ${winningPlayer} won!`)
}

export function displayShipToPlace(shipObj, direction) {
    const containerElement = document.querySelector(".ship-to-place")
    const nameElement = containerElement.querySelector(".ship-name")
    const shipContainer = containerElement.querySelector(".ship")

    nameElement.textContent = shipObj.name
    shipContainer.innerHTML = ""

    for (let i = 0; i < shipObj.length; i++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        cell.dataset.index = i
        shipContainer.appendChild(cell)
    }

    shipContainer.style = ""
    if (direction === "horizontal") {
        shipContainer.style.gridTemplateColumns = `repeat(${shipObj.length}, 1fr)`
    } else if (direction === "vertical") {
        shipContainer.style.gridTemplateRows = `repeat(${shipObj.length}, 1fr)`
    }
    
    shipContainer.dataset.shipName = shipObj.name
}

export function canStartGame() {
    const containerElement = document.querySelector(".ship-to-place")
    containerElement.style.display = "none"
}
