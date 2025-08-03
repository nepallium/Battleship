import "../css/reset.css"
import "../css/styles.css"

import Player from "./classes/Player";
import Gameboard from "./classes/Gameboard";
import Ship from "./classes/Ship";
import { displayShipToPlace, loadBoard } from "./domStuff";
import {resetGame} from "./gameFunctions";
import gameState from "./gameState";
import { initializeListeners } from "./userPlayer";

// Set up the game with predetermined ship coordinates
function setupGame() {
    // Reset the game state
    resetGame();
    
    // Create ships for player 1 (computer)
    const player1Ships = [
        new Ship(5, "Carrier"),
        new Ship(4, "Battleship"),
        new Ship(3, "Cruiser"),
        new Ship(3, "Submarine"),
        new Ship(2, "Destroyer")
    ];
    
    // Predetermined ship coordinates for player 1 (computer)
    const player1ShipCoords = [
        { ship: player1Ships[0], head: [0, 0], direction: "horizontal" }, // Carrier
        { ship: player1Ships[1], head: [2, 1], direction: "vertical" },   // Battleship
        { ship: player1Ships[2], head: [4, 3], direction: "horizontal" }, // Cruiser
        { ship: player1Ships[3], head: [6, 5], direction: "vertical" },   // Submarine
        { ship: player1Ships[4], head: [8, 7], direction: "horizontal" }  // Destroyer
    ];
    
    // Add ships to player 1's gameboard
    player1ShipCoords.forEach(({ ship, head, direction }) => {
        gameState.player1.gameboard.addShip(ship, head, direction);
    });
    
    // Set current player to player 2 (user goes first)
    gameState.currPlayer = gameState.player2;
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    setupGame();

    initializeListeners();
});
