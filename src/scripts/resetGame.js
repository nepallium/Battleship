import Player from "./classes/Player";
import { loadBoard } from "./domStuff";
import gameState from "./gameState";

export default function resetGame() {
    // Initialize boards
    const player1Board = document.querySelector("section.player-1")
    const player2Board = document.querySelector("section.player-2")
    
    loadBoard(player1Board)
    loadBoard(player2Board)

    // reset gameState
    gameState.player1 = new Player()
    gameState.player2 = new Player()
}