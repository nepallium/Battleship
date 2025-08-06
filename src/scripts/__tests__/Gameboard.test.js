import Gameboard from "../classes/Gameboard";
import Ship from "../classes/Ship";

describe("adding ships", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("add a ship vertical", () => {
    const ship2 = new Ship(2);

    gameboard.addShip(ship2, [0, 0], "vertical");

    expect(gameboard.board[0]).toEqual([ship2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(gameboard.board[1]).toEqual([ship2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test("add a ship horizontal", () => {
    const ship4 = new Ship(4);

    gameboard.addShip(ship4, [0, 2], "horizontal");

    expect(gameboard.board[0]).toEqual([
      0,
      0,
      ship4,
      ship4,
      ship4,
      ship4,
      0,
      0,
      0,
      0,
    ]);
  });
});

describe("receiving attacks", () => {
  let gameboard;
  let ship2, ship4;
  beforeAll(() => {
    gameboard = new Gameboard();
    ship2 = new Ship(2);
    ship4 = new Ship(4);
    gameboard.addShip(ship4, [0, 2], "horizontal");
    gameboard.addShip(ship2, [0, 0], "vertical");
  });

  test("successful hit", () => {
    let prevHits = ship4.hits;
    gameboard.receiveAttack([0, 5]);

    expect(ship4.hits).toBe(++prevHits);
  });

  test("multiple successful hits", () => {
    // + hit from test above
    let prevHits = ship4.hits;
    gameboard.receiveAttack([0, 4]);

    expect(ship4.hits).toBe(++prevHits);
  });

  test("missed hit", () => {
    gameboard.receiveAttack([0, 1]);

    expect(gameboard.board[0]).toEqual([
      ship2,
      1,
      ship4,
      ship4,
      ship4,
      ship4,
      0,
      0,
      0,
      0,
    ]);
  });

  test("win game", () => {
    gameboard.boatAmt = 2;

    // sink ship4
    gameboard.receiveAttack([0, 2]);
    gameboard.receiveAttack([0, 3]);

    // sink ship2
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 0]);

    expect(gameboard.isGameOver()).toBe(true);
  });
});
