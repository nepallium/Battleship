export default class Gameboard {
    #boardSize;
    constructor() {
        this.#boardSize = 10;
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
        } else {
            for (let row = startRow; row < startRow + ship.length; row++) {
                this.board[row][startCol] = ship;
            }
        }
    }

    receiveAttack(coords) {
        const [row, col] = coords;
        const cellVal = this.board[row][col]

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
        return this.boatsHitCtr === this.boatAmt ? true : false
    }

    #initBoard() {
        return Array.from({ length: this.#boardSize }, () =>
            new Array(this.#boardSize).fill(0)
        );
    }
}
