import Ship from "./Ship";

export default class Gameboard {
    constructor() {
        this.boardSize = 10;
        this.boatAmt = 5;
        this.board = this.#initBoard();
        this.boatsHitCtr = 0;
    }

    addShip(ship, head, direction) {
        const [startRow, startCol] = head;

        if (direction === "horizontal") {
            for (let col = startCol; col < startCol + ship.length; col++) {
                this.board[startRow][col] = ship;
            }
        } else if (direction === "vertical") {
            for (let row = startRow; row < startRow + ship.length; row++) {
                this.board[row][startCol] = ship;
            }
        }
    }

    // Check if a ship placement would collide with existing ships
    canPlaceShip(ship, head, direction) {
        const [startRow, startCol] = head;
        const shipLength = ship.length;

        // Check each cell the ship would occupy
        for (let i = 0; i < shipLength; i++) {
            let row, col;

            if (direction === "horizontal") {
                row = startRow;
                col = startCol + i;
            } else {
                row = startRow + i;
                col = startCol;
            }

            // Check if position is out of bounds
            if (
                row < 0 ||
                row >= this.boardSize ||
                col < 0 ||
                col >= this.boardSize
            ) {
                return false;
            }

            // Check adjacent cells for ships (including diagonals)
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const adjRow = row + dr;
                    const adjCol = col + dc;

                    // Skip if adjacent position is out of bounds
                    if (
                        adjRow < 0 ||
                        adjRow >= this.boardSize ||
                        adjCol < 0 ||
                        adjCol >= this.boardSize
                    ) {
                        continue;
                    }

                    // Skip if it's the current ship's position
                    if (adjRow === row && adjCol === col) {
                        continue;
                    }

                    // Check if adjacent cell has a ship
                    if (this.board[adjRow][adjCol] instanceof Ship) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    receiveAttack(coords) {
        const [row, col] = coords;
        const cellVal = this.board[row][col];

        if (cellVal === 0) {
            this.board[row][col] = 1;
        } else if (cellVal !== 1) {
            const ship = cellVal;
            ship.hit();

            if (ship.isSunk()) {
                this.boatsHitCtr++;
            }
        }
    }

    isGameOver() {
        return this.boatsHitCtr === this.boatAmt ? true : false;
    }

    #initBoard() {
        return Array.from({ length: this.boardSize }, () =>
            new Array(this.boardSize).fill(0)
        );
    }

    randomizeBoard() {
        // Reset the board first
        this.board = this.#initBoard();
        this.boatsHitCtr = 0;

        let remainingCoords = (function generateCoordsArr() {
            let coords = [];

            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    coords.push([i, j]);
                }
            }

            return coords;
        })();

        let shipsToPlace = [
            new Ship(5, "Carrier"),
            new Ship(4, "Battleship"),
            new Ship(3, "Cruiser"),
            new Ship(3, "Submarine"),
            new Ship(2, "Destroyer"),
        ];

        for (const ship of shipsToPlace) {
            let placed = false;

            let attempts = 0;
            const maxAttempts = 100; // Prevent infinite loops

            while (!placed && attempts < maxAttempts) {
                const direction =
                    Math.round(Math.random()) === 0 ? "horizontal" : "vertical";

                let validHeads = remainingCoords.filter((coord) =>
                    this.canPlaceShip(ship, coord, direction)
                );

                if (validHeads.length === 0) {
                    attempts++;
                    continue;
                }

                const idx = Math.floor(Math.random() * validHeads.length);
                const head = validHeads[idx];
                this.addShip(ship, head, direction);
                placed = true;
            }

            // If we couldn't place the ship after max attempts, restart the entire process
            if (!placed) {
                this.randomizeBoard();
            }
        }
    }

    resetBoard() {
        this.board = this.#initBoard()
    }

    removeOuterCells(remainingCoords, ship, head, direction) {
        const [headRow, headCol] = head;
        let tailRow, tailCol;
        if (direction === "horizontal") {
            tailRow = headRow;
            tailCol += ship.length;
        } else if (direction === "vertical") {
            tailCol = headCol;
            tailRow += ship.length;
        }
        let topLeft = [headRow - 1, headCol - 1];
        let bottomLeft = [tailRow + 1, tailCol - 1];
        let topRight = [headRow - 1, headCol + 1];
        let bottomRight = [tailRow + 1, tailCol + 1];

        const extremums = [topLeft, bottomLeft, topRight, bottomRight];

        extremums.map((coord) => {
            let [newX, newY] = coord;
            if (coord[0] < 0) {
                newX = 0;
            } else if (coord[0] > 9) {
                newX = 9;
            }
            if (coord[1] < 0) {
                newY = 0;
            } else if (coord[1] > 9) {
                newY = 9;
            }
            return [newX, newY];
        })[(topLeft, bottomLeft, topRight, bottomRight)] = extremums;

        for (let row = topLeft[0]; row <= bottomLeft[0]; row++) {
            remainingCoords.splice(
                remainingCoords.findIndex(
                    (coord) => coord[0] === row && coord[1] === topLeft[1]
                ),
                topRight[1] - topLeft[1]
            );
        }
    }
}
