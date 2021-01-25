export class Arcade {
    constructor(roomNumber) {
        this._allPlayers = [];
        this._x = 0;
        this._y = 0;
        this._view = 'arcade.html';
        this._roomNumber = roomNumber;
    }
    get view() {
        return this._view;
    }
    get roomNumber() {
        return this._roomNumber;
    }
    get allPlayers() {
        return this._allPlayers;
    }
    addPlayer(player) {
        this._allPlayers.push(player);
    }
    removePlayer(player) {
        this._allPlayers = this._allPlayers.filter(e => e !== player);
    }
    set x(x) {
        this._x = x;
    }
    get x() {
        return this._x;
    }
    set y(y) {
        this._y = y;
    }
    get y() {
        return this._y;
    }
    moveView() {
        document.getElementById('arcade').style.left = this._x + "px";
        document.getElementById('arcade').style.top = this._y + "px";
    }
}
