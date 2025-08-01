import { processAttack } from "./gameFunctions";
import { getDivFromCoord } from "./domStuff";
import gameState from "./gameState";

// use user's board copy to know which coordinates to select from
const coords = (function generateCoordsArr() {
    let coords = []

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            coords.push([i, j])
        }
    }

    return coords
})()

let adjCoords = []
let validHits = 0
let edgeCell1
export function computerMakeMove() {
    console.log("adj coords before move:", adjCoords)
    
    const size = coords.length
    
    let idx, selectedCoord
    if (adjCoords.length > 0) {
        idx = Math.floor(Math.random() * adjCoords.length)
        selectedCoord = adjCoords.splice(idx, 1)[0]
        coords.splice(coords.indexOf(selectedCoord), 1)
    } else {
        idx = Math.floor(Math.random() * size)
        selectedCoord = coords.splice(idx, 1)[0]
    }


    debugger; // This will pause execution when DevTools is open


    const selectedDiv = getDivFromCoord(selectedCoord)

    processAttack(selectedDiv, gameState.player2)

    if (selectedDiv.classList.contains("hit")) {
        if (++validHits === 1) {
            edgeCell1 = selectedCoord
            findAdjCoords(selectedCoord)
        }
        else if (validHits >= 2) {
            findAdjEdgeCoords(selectedCoord)
        }

        // Continue attacking adjacent cells after delay
        setTimeout(() => {
            computerMakeMove()
        }, 500)
        return // Exit current function to allow delay
    }
    else if (selectedDiv.classList.contains("sunk")) {
        // clear adjCoords
        adjCoords = []
        validHits = 0

        setTimeout(() => {
            computerMakeMove()
        }, 500)
    }
}

function findAdjCoords(base) {
    const [baseX, baseY] = base

    adjCoords.push(...coords.filter(coord => {
        const [x, y] = coord

        if (x === baseX) {
            if (y === baseY + 1 || y === baseY - 1) {
                return true
            }
        }
        if (y === baseY) {
            if (x === baseX + 1 || x === baseX - 1) {
                return true
            }
        }
        return false
    }))
}

function findAdjEdgeCoords(edgeCell2) {
    adjCoords = []
    const [row1, col1] = edgeCell1
    const [row2, col2] = edgeCell2
    // horizontal ship
    if (edgeCell1[0] === edgeCell2[0]) {
        let minCol = Math.min(col1, col2) - 1
        let maxCol = Math.max(col1, col2) + 1

        if (minCol >= 0) {
            adjCoords.push([row1, minCol])
        }
        if (maxCol <= 10) {
            adjCoords.push([row1, maxCol])
        }
    }
    // vertical ship
    else if (edgeCell1[1] === edgeCell2[1]) {
        let minRow = Math.min(row1, row2) - 1
        let maxRow = Math.max(row1, row2) + 1

        if (minRow >= 0) {
            adjCoords.push([minRow, col1])
        }
        if (maxRow <= 10) {
            adjCoords.push([maxRow, col1])
        }
    }

    console.log("adj coords edge:", adjCoords)
}
