export default class Ship {
  constructor(length, name) {
    this.length = length;
    this.hits = 0;
    this.name = name;
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
