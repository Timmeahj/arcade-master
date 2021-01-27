export class Arcade {
    constructor(roomNumber) {
        this._allPlayers = new Map();
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
    getPlayer(id) {
        if (!this._allPlayers.has(id)) {
            throw new Error("Player not found and can't be removed");
        }
        return this._allPlayers.get(id);
    }
    addPlayer(player) {
        this._allPlayers.set(player.id, player);
    }
    removePlayer(id) {
        if (!this._allPlayers.has(id)) {
            throw new Error("Player not found and can't be removed");
        }
        this._allPlayers.get(id).leave();
        this._allPlayers.delete(id);
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
    centerForClient(player) {
        document.getElementById('arcade').style.marginLeft = (window.innerWidth / 2) - (player.w / 2) + "px";
        document.getElementById('arcade').style.marginTop = (window.innerHeight / 2) - (player.h / 2) + "px";
    }
    findIndexById(id, ar) {
        let index = -1;
        for (let i = 0; i < ar.length; i++) {
            if (ar[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
