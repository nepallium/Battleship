import { processAttack } from "./gameFunctions";
import { getDivFromCoord } from "./domStuff";
import gameState from "./gameState";
import { enableBoard } from "./listeners";

// use user's board copy to know which coordinates to select from
const coords = (function generateCoordsArr() {
    let coords = [];

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            coords.push([i, j]);
        }
    }

    return coords;
})();

let adjCoords = [];
let hitShipCoords = [];
export function computerMakeMove() {
    const size = coords.length;
    
    
    // debugger; // This will pause execution when DevTools is open
    
    
    let idx, selectedCoord;
    if (adjCoords.length > 0) {
        idx = Math.floor(Math.random() * adjCoords.length);
        selectedCoord = adjCoords.splice(idx, 1)[0];
        coords.splice(coords.indexOf(selectedCoord), 1);
    } else {
        idx = Math.floor(Math.random() * size);
        selectedCoord = coords.splice(idx, 1)[0];
    }

    const selectedDiv = getDivFromCoord(selectedCoord);

    processAttack(selectedDiv, gameState.player2);

    // debugger; // This will pause execution when DevTools is open

    if (selectedDiv.classList.contains("hit")) {
        hitShipCoords.push(selectedCoord);

        if (hitShipCoords.length === 1) {
            findAdjCoords();
        } else if (hitShipCoords.length >= 2) {
            findAdjEdgeCoords();
        }

        // Continue attacking adjacent cells after delay
        setTimeout(() => {
            computerMakeMove();
        }, 500);
        return; // Exit current function to allow delay
    } else if (selectedDiv.classList.contains("sunk")) {
        // clear adjCoords
        adjCoords = [];
        hitShipCoords = [];

        setTimeout(() => {
            computerMakeMove();
        }, 500);
    } else {
        // Computer missed - switch back to user's turn
        gameState.switchTurn();
        gameState.setComputerThinking(false);
        enableBoard();
    }
}

function findAdjCoords() {
    const [baseX, baseY] = hitShipCoords[0];

    adjCoords.push(
        ...coords.filter((coord) => {
            const [x, y] = coord;

            if (x === baseX) {
                if (y === baseY + 1 || y === baseY - 1) {
                    return true;
                }
            }
            if (y === baseY) {
                if (x === baseX + 1 || x === baseX - 1) {
                    return true;
                }
            }
            return false;
        })
    );
}

function findAdjEdgeCoords() {
    adjCoords = [];

    hitShipCoords.sort(sortCoordArray)

    const head = hitShipCoords[0];
    const tail = hitShipCoords.at(-1);
    const [row1, col1] = head;
    const [row2, col2] = tail;
    // horizontal ship
    if (head[0] === tail[0]) {
        let minCol = col1 - 1;
        let maxCol = col2 + 1;

        if (minCol >= 0) {
            if (coordExists(row1, minCol)) {
                adjCoords.push([row1, minCol]);
            }
        }
        if (maxCol <= 9) {
            if (coordExists(row1, maxCol)) {
                adjCoords.push([row1, maxCol]);
            }
        }
    }
    // vertical ship
    else if (head[1] === tail[1]) {
        let minRow = row1 - 1;
        let maxRow = row2 + 1;

        if (minRow >= 0) {
            if (coordExists(minRow, col1)) {
                adjCoords.push([minRow, col1]);
            }
        }
        if (maxRow <= 9) {
            if (coordExists(maxRow, col1)) {
                adjCoords.push([maxRow, col1]);
            }
        }
    }
}

function sortCoordArray(coord1, coord2) {
    if (coord1[0] === coord2[0]) {
        return coord1[1] - coord2[1];
    } else {
        return coord1[0] - coord2[0];
    }
}
function coordExists(row, col) {
    return coords.some(coord => coord[0] === row && coord[1] === col);
}
