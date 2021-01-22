export class Arcade {
    constructor(roomNumber) {
        this._view = 'arcade.html';
        this._roomNumber = roomNumber;
    }
    get view() {
        return this._view;
    }
    get roomNumber() {
        return this._roomNumber;
    }
}
