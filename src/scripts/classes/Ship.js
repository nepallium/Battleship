export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    isSunk() {
        return this.hits === this.length;
    }

    hit() {
        if (!this.isSunk()) {
            this.hits++;
        }
    }
}
