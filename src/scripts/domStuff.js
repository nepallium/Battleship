import gameState from "./gameState";
import Ship from "./classes/Ship";
import { listenForStartGame } from "./listeners";

export function loadBoard(playerSectionElement) {
    playerSectionElement.innerHTML = "";
    const player = gameState.getPlayerFromElement(playerSectionElement);

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.dataset.position = JSON.stringify([i, j]);

            playerSectionElement.appendChild(cell);

            if (player === gameState.player2) {
                modifyShipCell(player, cell);
            }
        }
    }
    
    // Remove borders between ship cells
    if (player === gameState.player2) {
        removeShipCellBorders(playerSectionElement);
    }
}

function modifyShipCell(user, cell) {
    const [i, j] = JSON.parse(cell.dataset.position);

    const cellVal = user.gameboard.board[i][j];

    if (cellVal instanceof Ship) {
        const ship = cellVal;
        cell.dataset.value = "ship";
        cell.dataset.shipName = ship.name;
        cell.classList.add("no-drop");
        cell.classList.add("ship-cell");
    } else if (user.gameboard.adjacentCells.has(`${i},${j}`)) {
        cell.classList.add("no-drop");
    }
}

export function styleNoDropCells() {
    const noDropCells = document.querySelectorAll(".no-drop")
    noDropCells.forEach(cell => {
        cell.classList.replace("no-drop", "active-no-drop")
    })
}
export function unstyleNoDropCells() {
    const noDropCells = document.querySelectorAll(".active-no-drop")
    noDropCells.forEach(cell => {
        cell.classList.replace("active-no-drop", "no-drop")
    })
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
    const winState = winner === gameState.player2 ? "won!" : "lost";

    disableBoard(gameState.player1);
    disableBoard(gameState.player2);

    const modal = document.querySelector("dialog.end-game-modal")
    modal.showModal()
    const msg = modal.querySelector("p")
    msg.textContent = `You ${winState}`
}

export function displayShipToPlace(shipObj, direction) {
    const containerElement = document.querySelector(".ship-to-place");
    const nameElement = document.querySelector(".ship-placement .instruction .ship-name");
    const shipContainer = containerElement.querySelector(".ship");

    nameElement.textContent = shipObj.name;
    shipContainer.innerHTML = "";

    for (let i = 0; i < shipObj.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        shipContainer.appendChild(cell);
    }

    shipContainer.style = "";
    if (direction === "horizontal") {
        shipContainer.style.gridTemplateColumns = `repeat(${shipObj.length}, 2rem)`;
    } else if (direction === "vertical") {
        shipContainer.style.gridTemplateRows = `repeat(${shipObj.length}, 2rem)`;
    }

    shipContainer.dataset.shipName = shipObj.name;
}

export function showStartOptions() {
    const containerElement = document.querySelector(".ship-to-place");
    containerElement.style.display = "none";
    
    const msg = document.querySelector(".ship-placement .instruction")
    msg.classList.add("hide")
    const rotate = document.querySelector("button.rotate")
    rotate.style.display = "none"
    const startBtn = document.querySelector(".start-game")
    startBtn.style.display = "block"
    
    // Add the start game listener when button becomes visible
    listenForStartGame()
}

export function hideStartOptions() {
    const msg = document.querySelector(".ship-placement .instruction")
    msg.classList.remove("hide")
    const rotate = document.querySelector("button.rotate")
    rotate.style.display = "block"
    const startBtn = document.querySelector(".start-game")
    startBtn.style.display = "none"
}

export function startGame() {
    // Load the user's ships onto the main game board
    const userBoard = document.querySelector("main section.player-2");
    loadBoard(userBoard);
    
    enableBoard()
}

function removeShipCellBorders(boardElement) {
    const shipCells = boardElement.querySelectorAll('.ship-cell');
    
    shipCells.forEach(cell => {
        const [row, col] = JSON.parse(cell.dataset.position);
        const shipName = cell.dataset.shipName;
        
        // Check if there's a ship cell to the right
        if (col < 9) {
            const rightCell = boardElement.querySelector(`[data-position='[${row}, ${col + 1}]']`);
            if (rightCell && rightCell.dataset.shipName === shipName) {
                cell.style.borderRight = 'none';
                rightCell.style.borderLeft = 'none';
            }
        }
        
        // Check if there's a ship cell below
        if (row < 9) {
            const belowCell = boardElement.querySelector(`[data-position='[${row + 1}, ${col}]']`);
            if (belowCell && belowCell.dataset.shipName === shipName) {
                cell.style.borderBottom = 'none';
                belowCell.style.borderTop = 'none';
            }
        }
    });
}
