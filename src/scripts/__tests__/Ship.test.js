/// <reference types="jest" />
import Ship from "../Ship";

let ship
beforeEach(() => {
    ship = new Ship(2)
})

test("hit increase", () => {
    ship.hit()

    expect(ship.hits).toBe(1)
})

test("isSunk true", () => {
    ship.hit()
    ship.hit()

    expect(ship.isSunk()).toBe(true)
})

test("isSunk false", () => {
    ship.hit()

    expect(ship.isSunk()).toBe(false)
})

test("hit stops increasing if isSunk is true", () => {
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()

    expect(ship.hits).toBe(2)
})
