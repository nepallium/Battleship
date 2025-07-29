import Player from "./classes/Player";
import { loadBoard } from "./domStuff";
import gameState from "./gameState";

export default function resetGame() {
    // reset gameState
    gameState.player1 = new Player()
    gameState.player2 = new Player()
    
    // Initialize boards
    const player1Element = document.querySelector("section.player-1")
    const player2Element = document.querySelector("section.player-2")
    
    loadBoard(player1Element)
    loadBoard(player2Element)
}