import Player from "./classes/Player";
import { emboldenCurrentPlayerTurn } from "./domStuff";

class GameState {
  constructor() {
    this.player1 = new Player(); // computer's board
    this.player2 = new Player(); // user's board
    this.currentTurn = "user"; // 'user' or 'computer'
    this.isComputerThinking = false; // prevents user clicks during computer turn
  }

  getPlayerFromElement(playerSectionElement) {
    return playerSectionElement.classList.contains("player-1")
      ? this.player1
      : this.player2;
  }

  getElementFromPlayer(player) {
    return player === this.player1
      ? document.querySelector("section.player-1")
      : document.querySelector("section.player-2");
  }

  switchTurn() {
    this.currentTurn = this.currentTurn === "user" ? "computer" : "user";
    emboldenCurrentPlayerTurn();
  }

  isUserTurn() {
    return this.currentTurn === "user" && !this.isComputerThinking;
  }

  isComputerTurn() {
    return this.currentTurn === "computer" || this.isComputerThinking;
  }

  setComputerThinking(thinking) {
    this.isComputerThinking = thinking;
  }
}

export default new GameState();
